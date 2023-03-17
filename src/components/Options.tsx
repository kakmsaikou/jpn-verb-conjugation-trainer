import { computed, defineComponent, reactive } from 'vue';
import { useConfigStore } from '../stores/useConfigStore';
import { useCorrectAnswerStore } from '../stores/useCorrectAnswer';
import { deepClone } from '../utils/deepClone';
import { Button } from './Button';
import s from './Options.module.scss';
import { BILINGUAL_LIST, FORM_KANJI_MAP, VERB_FORM_LIST } from '../const';

export const Options = defineComponent({
  emits: ['close'],
  setup: (props, context) => {
    const configStore = useConfigStore();
    const correctAnswer = useCorrectAnswerStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { verb, adj, pos } = tempConfig;

    const posValid = computed(() => {
      return pos.verb || pos.adj;
    });

    const verbValid = computed(() => {
      return verb.masu || verb.te || verb.ta || verb.nai;
    });

    const sowValid = computed(() => {
      return adj.sow.plain || adj.sow.polite;
    });
    const tenseValid = computed(() => {
      return adj.tense.present || adj.tense.past;
    });
    const polarityValid = computed(() => {
      return adj.polarity.affirmative || adj.polarity.negative;
    });

    const adjValid = computed(() => {
      return sowValid.value && tenseValid.value && polarityValid.value;
    });

    const formValid = computed(() => {
      if (posValid.value === false) return false;
      if (pos.verb === true && verbValid.value === false) return false;
      if (pos.adj === true && adjValid.value === false) return false;
      return true;
    });

    const adjFormList = [
      {
        isValid: sowValid,
        options: adj.sow,
        key: ['plain', 'polite'],
      },
      {
        isValid: tenseValid,
        options: adj.tense,
        key: ['present', 'past'],
      },
      {
        isValid: polarityValid,
        options: adj.polarity,
        key: ['affirmative', 'negative'],
      },
    ];

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
          <div>
            <h3>
              <input type='checkbox' v-model={pos.verb} />
              动词
            </h3>
            {pos.verb ? (
              <div class={s.ulWrapper}>
                <h4 v-show={!verbValid.value}>*你至少需要选择一个类别</h4>
                <ul v-show={pos.verb}>
                  {VERB_FORM_LIST.map(form => (
                    <li>
                      <input type='checkbox' v-model={verb[form]} />
                      <span>{FORM_KANJI_MAP[form]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div>
            <h3>
              <input type='checkbox' v-model={pos.adj} />
              形容词
            </h3>
            {pos.adj ? (
              <div>
                {
                  adjFormList.map(({ isValid, options, key }) => (
                    <div class={s.ulWrapper}>
                      <h4 v-show={!isValid.value}>*你至少需要选择一个类别</h4>
                      <ul>
                        {key.map(k => (
                          <li>
                            <input type='checkbox' v-model={options[k as keyof typeof options]} />
                            <span>{BILINGUAL_LIST[k as keyof typeof BILINGUAL_LIST]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                }
              </div>
            ) : null}
          </div>
          <Button onClick={onClick} disabled={formValid.value}>
            戻る ↩
          </Button>
        </form>
      </div>
    );
  },
});
