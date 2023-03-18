import { computed, defineComponent, PropType, Ref, watch } from 'vue';
import { BILINGUAL_LIST } from '../const';
import s from './AdjOptions.module.scss';

type AdjConfig = {
  sow: Record<Sow, boolean>;
  polarity: Record<Polarity, boolean>;
  tense: Record<Tense, boolean>;
};

export const AdjOptions = defineComponent({
  emits: ['updateAdj'],
  props: {
    adjConfig: {
      type: Object as PropType<AdjConfig>,
      required: true,
    },
  },
  setup: (props, context) => {
    const { sow, tense, polarity } = props.adjConfig;
    const sowValid = computed(() => {
      return sow.plain || sow.polite;
    });
    const tenseValid = computed(() => {
      return tense.present || tense.past;
    });
    const polarityValid = computed(() => {
      return polarity.affirmative || polarity.negative;
    });
    const adjValid = computed(() => {
      return sowValid.value && tenseValid.value && polarityValid.value;
    });
    watch(adjValid, (newVal, oldVal) => {
      context.emit('updateAdj', newVal);
    });

    const adjFormList = [
      {
        isValid: sowValid,
        options: sow,
        key: ['plain', 'polite'],
      },
      {
        isValid: tenseValid,
        options: tense,
        key: ['present', 'past'],
      },
      {
        isValid: polarityValid,
        options: polarity,
        key: ['affirmative', 'negative'],
      },
    ];
    return () => (
      <>
        {adjFormList.map(({ isValid, options, key }) => (
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
        ))}
      </>
    );
  },
});
