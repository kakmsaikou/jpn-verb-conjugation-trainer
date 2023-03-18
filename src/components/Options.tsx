import { computed, defineComponent, reactive, ref } from 'vue';
import { useConfigStore } from '../stores/useConfigStore';
import { useInquiryStore } from '../stores/useInquiryStore';
import { deepClone } from '../utils/deepClone';
import { Button } from './Button';
import s from './Options.module.scss';
import { AdjOptions } from './AdjOptions';
import { VerbOptions } from './VerbOptions';

export const Options = defineComponent({
  emits: ['close'],
  setup: (props, context) => {
    const configStore = useConfigStore();
    const correctAnswer = useInquiryStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { pos } = tempConfig;

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
      correctAnswer.refreshCorrectAnswer();
      context.emit('close', false);
    };
    return () => (
      <div class={s.wrapper}>
        <h2>设置</h2>
        <form class={s.optionsForm}>
          <h4 v-show={!posValid.value}>*你至少需要选择一个类别</h4>
          <VerbOptions tempConfig={tempConfig} onUpdateVerb={updateVerbValid} />
          <AdjOptions tempConfig={tempConfig} onUpdateAdj={updateAdjValid} />
          <Button onClick={onClick} disabled={formValid.value}>
            戻る ↩
          </Button>
        </form>
      </div>
    );
  },
});
