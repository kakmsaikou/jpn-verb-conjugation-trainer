import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
import { BILINGUAL_LIST, VERB_FORM_LIST, VERB_TYPE_LIST } from '../../const';
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

    const refX = ref() as Ref<HTMLParagraphElement>;
    const refXVisible = ref(false);

    const typeValid = computed(() => {
      return verb.v5 || verb.v1 || verb.suru || verb.kuru;
    });
    const formValid = computed(() => {
      const validFormList = VERB_FORM_LIST.filter(form => verb[form] === true);
      return validFormList.length > 0;
    });
    const verbValid = computed(() => {
      return typeValid.value && formValid.value;
    });

    watch(verbValid, newVal => {
      context.emit('updateVerb', newVal);
    });

    const handlePoliteForm = (e: MouseEvent) => {
      e.preventDefault();
      if (refX.value.classList.contains('display')) {
        refX.value.classList.remove('display');
        refXVisible.value = false;
      } else {
        refX.value.classList.add('display');
        refXVisible.value = true;
      }
    };
    return () => (
      <div class={s.wrapper}>
        <h3>
          <input type='checkbox' v-model={pos.verb} />
          动词
        </h3>
        {pos.verb ? (
          <div class={s.relativeBox}>
            <div class={s.relativeBox}>
              <h4 v-show={!typeValid.value}>*你至少需要选择一个类别</h4>
              <ul>
                {VERB_TYPE_LIST.map(type => (
                  <li>
                    <input type='checkbox' v-model={verb[type]} />
                    <span>{BILINGUAL_LIST[type]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class={s.relativeBox}>
              <h4 v-show={!formValid.value}>*你至少需要选择一个类别</h4>
              <ul>
                <li>
                  <input type='checkbox' v-model={verb['politeForm']} />
                  <span>{BILINGUAL_LIST['politeForm']}</span>
                  <button class={s.displayButton} onClick={handlePoliteForm} ref={refX}>
                    {'<'}
                  </button>
                  <ul v-show={refXVisible.value}>
                    {['politePastForm', 'politeNegativeForm', 'politePastNegativeForm'].map(form => (
                      <li>
                        <input type='checkbox' v-model={verb[form as VerbForm]} />
                        <span>{BILINGUAL_LIST[form as VerbForm]}</span>
                      </li>
                    ))}
                  </ul>
                </li>
                {VERB_FORM_LIST.map(form => {
                  return ['politeForm', 'politePastForm', 'politeNegativeForm', 'politePastNegativeForm'].includes(
                    form
                  ) ? null : (
                    <li>
                      <input type='checkbox' v-model={verb[form]} />
                      <span>{BILINGUAL_LIST[form]}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
});

export default VerbOptions;
