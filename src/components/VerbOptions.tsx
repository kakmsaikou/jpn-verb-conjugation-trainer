import { computed, defineComponent, PropType, watch } from 'vue';
import { BILINGUAL_LIST, VERB_FORM_LIST } from '../const';
import s from './WordOptions.module.scss';

export const VerbOptions = defineComponent({
  emits: ['updateVerb'],
  props: {
    tempConfig: {
      type: Object as PropType<Config>,
      required: true,
    },
  },
  setup: (props, context) => {
    const { pos, verb } = props.tempConfig;
    const verbValid = computed(() => {
      return verb.masu || verb.te || verb.ta || verb.nai;
    });
    watch(verbValid, (newVal, oldVal) => {
      context.emit('updateVerb', newVal);
    });

    return () => (
      <div class={s.wrapper}>
        <h3>
          <input type='checkbox' v-model={pos.verb} />
          动词
        </h3>
        {pos.verb ? (
          <div class={s.relativeBox}>
            <h4 v-show={!verbValid.value}>*你至少需要选择一个类别</h4>
            <ul>
              {VERB_FORM_LIST.map(form => (
                <li>
                  <input type='checkbox' v-model={verb[form]} />
                  <span>{BILINGUAL_LIST[form]}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  },
});

export default VerbOptions;
