import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { AdjOptions } from '../components/setting/AdjOptions';
import { Button } from '../components/Button';
import { VerbOptions } from '../components/setting/VerbOptions';
import { useConfigStore } from '../stores/useConfigStore';
import { useWordStore } from '../stores/useWordStore';
import { deepClone } from '../utils/deepClone';
import s from './SettingPage.module.scss';
import Slider from '../components/setting/Slider';

export const SettingPage = defineComponent({
  setup: (props, context) => {
    const configStore = useConfigStore();
    const wordStore = useWordStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { pos } = tempConfig;
    const router = useRouter();

    const posValid = computed(() => {
      return pos.verb || pos.adj;
    });

    const verbValid = ref<boolean | null>(null);
    const updateVerbValid = (val: boolean) => {
      verbValid.value = val;
    };

    const adjValid = ref<boolean | null>(null);
    const updateAdjValid = (val: boolean) => {
      adjValid.value = val;
    };

    const formValid = computed(() => {
      if (posValid.value === false) return false;
      if (pos.verb === true && verbValid.value === false) return false;
      if (pos.adj === true && adjValid.value === false) return false;
      return true;
    });

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      configStore.setConfig(tempConfig);
      wordStore.refreshWord();
      router.replace('/');
    };

    const handleFuck = (selected: Pron) => {
      tempConfig.pron = selected;
    };

    const pronOptions: Pron[] = ['平假名', '罗马音', '无注音'];

    return () => (
      <div>
        <h2>设置</h2>
        <form class={s.optionsForm}>
          <p class={s.pron}>
            是否要注音？
            <Slider options={pronOptions} init={tempConfig.pron} onOption={handleFuck} />
          </p>
          
          <p>
            <input type="checkbox" v-model={tempConfig.voice}/>
            是否发音？
          </p>
          
          <p class={s.target}>
            每日答题目标（达到目标后会提醒）
            <input type='number' class={s.targetNum} value={0} min={0}/>
          </p>

          <div class={s.relativeBox}>
            <h4 v-show={!posValid.value}>*你至少需要选择一个类别</h4>
            <VerbOptions tempConfig={tempConfig} onUpdateVerb={updateVerbValid} />
            <AdjOptions tempConfig={tempConfig} onUpdateAdj={updateAdjValid} />
          </div>

          <Button onClick={onClick} disabled={formValid.value}>
            戻る ↩
          </Button>
        </form>
      </div>
    );
  },
});

export default SettingPage;
