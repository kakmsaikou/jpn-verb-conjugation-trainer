import { computed, defineComponent, PropType, Ref, watch } from 'vue';
import { BILINGUAL_LIST } from '../const';
import handleCheckbox from '../utils/handleCheckbox';
import s from './WordOptions.module.scss';

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
    const { sow, tense, polarity } = adj;
    const adjVoiceList = [
      {
        options: sow,
        key: ['plain', 'polite'],
      },
      {
        options: tense,
        key: ['present', 'past'],
      },
      {
        options: polarity,
        key: ['affirmative', 'negative'],
      },
    ];
    const plainValid = computed(() => {
      // 不能出现简体+肯定+现在的语态
      if (sow.plain && !sow.polite) {
        if (polarity.affirmative && !polarity.negative) {
          if (tense.present && !tense.past) {
            return false;
          }
        }
      }
      return true;
    });
    watch(plainValid, newVal => {
      context.emit('updateAdj', newVal);
    });
    return () => (
      <div class={s.wrapper}>
        <h3>
          <input type='checkbox' v-model={pos.adj} />
          形容词
        </h3>
        {pos.adj ? (
          <div class={s.relativeBox}>
            <h4 v-show={!plainValid.value}>*你不能同时只选择“简体”、“现在”、“肯定”</h4>
            {adjVoiceList.map(({ options, key }) => (
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
        ) : null}
      </div>
    );
  },
});
