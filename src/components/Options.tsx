import { defineComponent, reactive, ref, watch } from 'vue';
import { useConfigStore } from '../stores/useConfigStore';
import { deepClone } from '../utils/deepClone';
import s from './Options.module.scss';

export const Options = defineComponent({
  props: {
    isOptionsVisible: {
      type: Boolean,
      required: true,
    },
  },
  setup: (props, context) => {
    const configStore = useConfigStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { verb } = tempConfig;
    const isSubmitDisabled = ref(false);

    watch(tempConfig, () => {
      let isVerbValid = false;
      for (let key of Object.keys(verb)) {
        const value = verb[key as keyof typeof verb];
        if (value === true) {
          isVerbValid = true;
        }
      }
      isSubmitDisabled.value = false;
      if (!isVerbValid) {
        isSubmitDisabled.value = true;
      }
    });

    const onSubmit = (e: MouseEvent) => {
      e.preventDefault();
      configStore.setConfig(tempConfig);
    };
    return () => (
      <div class={s.wrapper} v-show={props.isOptionsVisible}>
        <h2>设置</h2>
        <form class={s.optionsForm}>
          <h3>动词</h3>
          <ul>
            <li>
              <input type='checkbox' v-model={verb.masu} />
              <span>ます形</span>
            </li>
            <li>
              <input type='checkbox' v-model={verb.ta} />
              <span>て形</span>
            </li>
            <li>
              <input type='checkbox' v-model={verb.te} />
              <span>た形</span>
            </li>
          </ul>
          <button onClick={onSubmit} disabled={isSubmitDisabled.value}>
            返回
          </button>
        </form>
      </div>
    );
  },
});
