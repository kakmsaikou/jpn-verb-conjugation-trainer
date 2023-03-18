import { computed, defineComponent, reactive, ref } from 'vue';
import { useConfigStore } from '../stores/useConfigStore';
import { useCorrectAnswerStore } from '../stores/useCorrectAnswer';
import { deepClone } from '../utils/deepClone';
import { Button } from './Button';
import s from './Options.module.scss';
import { BILINGUAL_LIST, FORM_KANJI_MAP, VERB_FORM_LIST } from '../const';
import { AdjOptions } from './AdjOptions';

export const Options = defineComponent({
  emits: ['close'],
  setup: (props, context) => {
    const configStore = useConfigStore();
    const correctAnswer = useCorrectAnswerStore();
    const tempConfig: Config = reactive(deepClone(configStore.config));
    const { verb, pos } = tempConfig;

    const posValid = computed(() => {
      return pos.verb || pos.adj;
    });

    const verbValid = computed(() => {
      return verb.masu || verb.te || verb.ta || verb.nai;
    });

    const adjValid = ref<boolean | null>(null);

    const onUpdateAdj = (val: boolean) => {
      adjValid.value = val;
    };

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
            {pos.adj ? <AdjOptions tempConfig={tempConfig} onUpdateAdj={onUpdateAdj} /> : null}
          </div>
          <Button onClick={onClick} disabled={formValid.value}>
            戻る ↩
          </Button>
        </form>
      </div>
    );
  },
});
