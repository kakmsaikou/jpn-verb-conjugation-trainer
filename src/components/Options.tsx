import { defineComponent, reactive, ref, watch } from 'vue';
import { useConfigStore } from '../stores/useConfigStore';
import { useCorrectAnswerStore } from '../stores/useCorrectAnswer';
import { deepClone } from '../utils/deepClone';
import Button from './Button';
import s from './Options.module.scss';

export const Options = defineComponent({
  emits: ['close'],
  setup: (props, context) => {
    const configStore = useConfigStore();
    const correctAnswer = useCorrectAnswerStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { verb } = tempConfig;
    const refVerbValid = ref(true);

    watch(tempConfig, () => {
      refVerbValid.value = false;
      for (let key of Object.keys(verb)) {
        const value = verb[key as keyof typeof verb];
        if (value === true) {
          refVerbValid.value = true;
        }
      }
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
          <h3>动词</h3>
          <h4 v-show={!refVerbValid.value}>*你至少需要选择一个类别</h4>
          <ul>
            <li>
              <input type='checkbox' v-model={verb.masu} />
              <span>ます形</span>
            </li>
            <li>
              <input type='checkbox' v-model={verb.te} />
              <span>て形</span>
            </li>
            <li>
              <input type='checkbox' v-model={verb.ta} />
              <span>た形</span>
            </li>
          </ul>
          <Button onClick={onClick} disabled={refVerbValid.value}>
            戻る ↩
          </Button>
        </form>
      </div>
    );
  },
});
