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
    const { polarity, tense } = verb;
    const plainValid = computed(() => {
      // 不能出现简体+肯定+现在的语态
      if (verb.plain && !verb.masu) {
        if (polarity.affirmative && !polarity.negative) {
          if (tense.present && !tense.past) {
            return false;
          }
        }
      }
      return true;
    });
    const plainOrMasuSelected = computed(() => {
      return verb.plain || verb.masu;
    });
    const formValid = computed(() => {
      return verb.plain || verb.masu || verb.te;
    });
    const verbValid = computed(() => {
      if (plainOrMasuSelected) {
        return plainValid.value && formValid.value;
      }
      return plainValid.value && formValid.value;
    });
    watch(verbValid, newVal => {
      context.emit('updateVerb', newVal);
    });

    const onChangeForTense = (key: Tense) => {
      if (!tense.present === !tense.past) {
        tense[key] = true;
      }
    };
    const onChangeForPolarity = (key: Polarity) => {
      if (!polarity.affirmative === !polarity.negative) {
        polarity[key] = true;
      }
    };

    return () => (
      <div class={[s.wrapper, s.relativeBox]}>
        <h3>
          <input type='checkbox' v-model={pos.verb} />
          动词
        </h3>
        <h4 v-show={!plainValid.value}>*你不能同时只选择“简体”、“现在”、“肯定”</h4>
        {pos.verb ? (
          <>
            <div class={s.relativeBox}>
              <h4 v-show={!formValid.value}>*你至少需要选择一个类别</h4>
              <ul>
                {VERB_FORM_LIST.map(form => (
                  <li>
                    <input type='checkbox' v-model={verb[form]} />
                    <span>{BILINGUAL_LIST[form]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div v-show={plainOrMasuSelected.value}>
              <ul>
                <li>
                  <input
                    type='checkbox'
                    v-model={tense.present}
                    onChange={() => {
                      onChangeForTense('past');
                    }}
                  />
                  <span>现在</span>
                </li>
                <li>
                  <input
                    type='checkbox'
                    v-model={tense.past}
                    onChange={() => {
                      onChangeForTense('present');
                    }}
                  />
                  <span>过去</span>
                </li>
              </ul>
              <ul>
                <li>
                  <input
                    type='checkbox'
                    v-model={polarity.affirmative}
                    onChange={() => {
                      onChangeForPolarity('negative');
                    }}
                  />
                  <span>肯定</span>
                </li>
                <li>
                  <input
                    type='checkbox'
                    v-model={polarity.negative}
                    onChange={() => {
                      onChangeForPolarity('affirmative');
                    }}
                  />
                  <span>否定</span>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </div>
    );
  },
});

export default VerbOptions;
