import { computed, defineComponent, PropType, Ref, watch } from 'vue';
import { BILINGUAL_LIST } from '../const';
import s from './WordOptions.module.scss';

type AdjConfig = {
  sow: Record<Sow, boolean>;
  polarity: Record<Polarity, boolean>;
  tense: Record<Tense, boolean>;
};

export const AdjOptions = defineComponent({
  emits: ['updateAdj'],
  props: {
    tempConfig: {
      type: Object as PropType<Config>,
      required: true,
    },
  },
  setup: (props, context) => {
    const { pos, adj } = props.tempConfig;
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
    watch(adjValid, (newVal, oldVal) => {
      context.emit('updateAdj', newVal);
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
    return () => (
      <>
        <h3>
          <input type='checkbox' v-model={pos.adj} />
          形容词
        </h3>

        {pos.adj
          ? adjFormList.map(({ isValid, options, key }) => (
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
          : null}
      </>
    );
  },
});
