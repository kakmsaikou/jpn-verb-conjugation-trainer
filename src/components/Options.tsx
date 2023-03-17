import { computed, defineComponent, reactive } from 'vue';
import { useConfigStore } from '../stores/useConfigStore';
import { useCorrectAnswerStore } from '../stores/useCorrectAnswer';
import { deepClone } from '../utils/deepClone';
import { Button } from './Button';
import s from './Options.module.scss';
import { FORM_KANJI_MAP, VERB_FORM_LIST } from '../const';

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
                <div class={s.ulWrapper}>
                  <h4 v-show={!sowValid.value}>*你至少需要选择一个类别</h4>
                  <ul>
                    <li>
                      <input type='checkbox' v-model={adj.sow.plain} />
                      <span>简体</span>
                    </li>
                    <li>
                      <input type='checkbox' v-model={adj.sow.polite} />
                      <span>敬体</span>
                    </li>
                  </ul>
                </div>
                <div class={s.ulWrapper}>
                  <h4 v-show={!tenseValid.value}>*你至少需要选择一个类别</h4>
                  <ul>
                    <li>
                      <input type='checkbox' v-model={adj.tense.present} />
                      <span>现在</span>
                    </li>
                    <li>
                      <input type='checkbox' v-model={adj.tense.past} />
                      <span>过去</span>
                    </li>
                  </ul>
                </div>
                <div class={s.ulWrapper}>
                  <h4 v-show={!polarityValid.value}>*你至少需要选择一个类别</h4>
                  <ul>
                    <li>
                      <input type='checkbox' v-model={adj.polarity.affirmative} />
                      <span>肯定</span>
                    </li>
                    <li>
                      <input type='checkbox' v-model={adj.polarity.negative} />
                      <span>否定</span>
                    </li>
                  </ul>
                </div>
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
