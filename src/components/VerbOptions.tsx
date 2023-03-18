import { computed, defineComponent, PropType, watch } from 'vue';
import { FORM_KANJI_MAP, VERB_FORM_LIST } from '../const';
import s from './WordOptions.module.scss';

export const VerbOptions = defineComponent({
  emits: ['updateVerb'],
  props: {
    verbConfig: {
      type: Object as PropType<Record<VerbForm, boolean>>,
      required: true,
    },
  },
  setup: (props, context) => {
    const verbValid = computed(() => {
      return props.verbConfig.masu || props.verbConfig.te || props.verbConfig.ta || props.verbConfig.nai;
    });
    watch(verbValid, (newVal, oldVal) => {
      context.emit('updateVerb', newVal);
    });

    return () => (
      <div class={s.ulWrapper}>
        <h4 v-show={!verbValid.value}>*你至少需要选择一个类别</h4>
        <ul>
          {VERB_FORM_LIST.map(form => (
            <li>
              <input type='checkbox' v-model={props.verbConfig[form]} />
              <span>{FORM_KANJI_MAP[form]}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
});

export default VerbOptions;
