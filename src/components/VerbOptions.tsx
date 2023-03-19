import { computed, defineComponent, PropType, watch } from 'vue';
import { BILINGUAL_LIST, VERB_FORM_LIST, VERB_TYPE_LIST } from '../const';
import handleCheckbox from '../utils/handleCheckbox';
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
    const { polarity, tense, type_list } = verb;
    const verbVoiceList = [
      {
        options: tense,
        key: ['present', 'past'],
      },
      {
        options: polarity,
        key: ['affirmative', 'negative'],
      },
    ];

    const typeValid = computed(() => {
      return type_list.v5 || type_list.v1 || type_list.suru || type_list.kuru;
    });
    const plainValid = computed(() => {
      // 不能出现简体+肯定+现在的语态
      return !(verb.plain && !verb.masu && polarity.affirmative && !polarity.negative && tense.present && !tense.past);
    });
    const plainOrMasuSelected = computed(() => {
      return verb.plain || verb.masu;
    });
    const formValid = computed(() => {
      return verb.plain || verb.masu || verb.te;
    });
    const verbValid = computed(() => {
      return plainValid.value && formValid.value && typeValid.value;
    });

    watch(verbValid, newVal => {
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
            <div class={s.relativeBox}>
              <h4 v-show={!typeValid.value}>*你至少需要选择一个类别</h4>
              <ul>
                {VERB_TYPE_LIST.map(type => (
                  <li>
                    <input type='checkbox' v-model={type_list[type]} />
                    <span>{BILINGUAL_LIST[type]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class={s.relativeBox}>
              <h4 v-show={!plainValid.value}>*你不能同时只选择“简体”、“现在”、“肯定”</h4>
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
              {verbVoiceList.map(({ options, key }) => (
                <ul>
                  {key.map(k => (
                    <li>
                      <input
                        type='checkbox'
                        v-model={options[k as keyof typeof options]}
                        onChange={() => {
                          handleCheckbox(options, k as keyof typeof options);
                        }}
                      />
                      <span>{BILINGUAL_LIST[k as keyof typeof BILINGUAL_LIST]}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div class={s.tips}>
              <p>「た形」= 简体 + 过去</p>
              <br />
              <p>「ない形」= 简体 + 否定</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
});

export default VerbOptions;
