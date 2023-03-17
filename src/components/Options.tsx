import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useConfigStore } from '../stores/useConfigStore';
import { useCorrectAnswerStore } from '../stores/useCorrectAnswer';
import { deepClone } from '../utils/deepClone';
import { Button } from './Button';
import s from './Options.module.scss';
import { ADJ_FORM_LIST, FORM_KANJI_MAP, VERB_FORM_LIST } from '../const';
import { isWordFormValid } from '../utils/isWordFormValid';

export const Options = defineComponent({
  emits: ['close'],
  setup: (props, context) => {
    const configStore = useConfigStore();
    const correctAnswer = useCorrectAnswerStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { verb, adj, pos } = tempConfig;

    const refPosValid = ref(true);
    const refVerbValid = ref(true);
    const refAdjValid = ref(true);

    watch(tempConfig, () => {
      refPosValid.value = isWordFormValid(pos);
      refVerbValid.value = isWordFormValid(verb);
      refAdjValid.value = isWordFormValid(adj);
    });

    const formValid = computed(() => {
      if (refPosValid.value === false) return false;
      if (pos.verb === true && refVerbValid.value === false) return false;
      if (pos.adj === true && refAdjValid.value === false) return false;
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
          <h4 v-show={!refPosValid.value}>*你至少需要选择一个类别</h4>
          <div>
            <h3>
              <input type='checkbox' v-model={pos.verb} />
              动词
            </h3>
            {pos.verb ? (
              <div class={s.ulWrapper}>
                <h4 v-show={!refVerbValid.value}>*你至少需要选择一个类别</h4>
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
            <div class={s.ulWrapper}>
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
          <Button onClick={onClick} disabled={true}>
            戻る ↩
          </Button>
        </form>
      </div>
    );
  },
});
