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
    const tenseValid = computed(() => {
      return tense.present || tense.past;
    });
    const polarityValid = computed(() => {
      return polarity.affirmative || polarity.negative;
    });
    const plainOrMasuSelected = computed(() => {
      return verb.plain || verb.masu;
    });
    const formValid = computed(() => {
      return verb.plain || verb.masu || verb.te;
    });
    const verbValid = computed(() => {
      if(plainOrMasuSelected){
        return plainValid.value && formValid.value && tenseValid.value && polarityValid.value;
      }
      return plainValid.value && formValid.value;
    });
    watch(verbValid, (newVal, oldVal) => {
      context.emit('updateVerb', newVal);
    });

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
              <div class={s.relativeBox}>
                <h4 v-show={!tenseValid.value}>*你至少需要选择一个类别</h4>
                <ul>
                  <li>
                    <input type='checkbox' v-model={tense.present} />
                    <span>现在</span>
                  </li>
                  <li>
                    <input type='checkbox' v-model={tense.past} />
                    <span>过去</span>
                  </li>
                </ul>
              </div>

              <div class={s.relativeBox}>
                <h4 v-show={!polarityValid.value}>*你至少需要选择一个类别</h4>
                <ul>
                  <li>
                    <input type='checkbox' v-model={polarity.affirmative} />
                    <span>肯定</span>
                  </li>
                  <li>
                    <input type='checkbox' v-model={polarity.negative} />
                    <span>否定</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  },
});

export default VerbOptions;
