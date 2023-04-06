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

    const refPoliteUlButton = ref() as Ref<HTMLParagraphElement>;
    const refPoliteUlVisible = ref(false);

    const refNegativeUlButton = ref() as Ref<HTMLParagraphElement>;
    const refNegativeUlVisible = ref(false);

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

    const handlePoliteForm = (
      e: MouseEvent,
      refUl: Ref<HTMLParagraphElement>,
      refUlVisible: Ref<Boolean>
    ) => {
      e.preventDefault();
      if (refUl.value.classList.contains('display')) {
        refUl.value.classList.remove('display');
        refUlVisible.value = false;
      } else {
        refUl.value.classList.add('display');
        refUlVisible.value = true;
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
                {VERB_FORM_LIST.map(form => {
                  if (form === 'verbPoliteForm') {
                    return (
                      <li>
                        <input type='checkbox' v-model={verb[form]} />
                        <span>{BILINGUAL_LIST[form]}</span>
                        <button
                          class={s.displayButton}
                          onClick={e => {
                            handlePoliteForm(
                              e,
                              refPoliteUlButton,
                              refPoliteUlVisible
                            );
                          }}
                          ref={refPoliteUlButton}
                        >
                          {'<'}
                        </button>
                        <ul v-show={refPoliteUlVisible.value}>
                          {[
                            'verbPolitePastForm',
                            'verbPoliteNegativeForm',
                            'verbPolitePastNegativeForm',
                          ].map(form => (
                            <li>
                              <input
                                type='checkbox'
                                v-model={verb[form as VerbForm]}
                              />
                              <span>{BILINGUAL_LIST[form as VerbForm]}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  } else if (form === 'verbSimpleNegativeForm') {
                    return (
                      <li>
                        <input type='checkbox' v-model={verb[form]} />
                        <span>{BILINGUAL_LIST[form]}</span>
                        <button
                          class={s.displayButton}
                          onClick={e => {
                            handlePoliteForm(
                              e,
                              refNegativeUlButton,
                              refNegativeUlVisible
                            );
                          }}
                          ref={refNegativeUlButton}
                        >
                          {'<'}
                        </button>
                        <ul v-show={refNegativeUlVisible.value}>
                          <li>
                            <input
                              type='checkbox'
                              v-model={verb['verbSimplePastNegativeForm']}
                            />
                            <span>
                              {BILINGUAL_LIST['verbSimplePastNegativeForm']}
                            </span>
                          </li>
                        </ul>
                      </li>
                    );
                  }
                  return [
                    'verbPolitePastForm',
                    'verbPoliteNegativeForm',
                    'verbPolitePastNegativeForm',
                    'verbSimplePastNegativeForm',
                  ].includes(form) ? null : (
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
