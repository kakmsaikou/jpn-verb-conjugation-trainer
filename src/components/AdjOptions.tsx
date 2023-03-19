import { computed, defineComponent, PropType, Ref, watch } from 'vue';
import { ADJ_TYPE_LIST, BILINGUAL_LIST } from '../const';
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
    const { sow, tense, polarity, type_list } = adj;

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

    const typeValid = computed(() => {
      return type_list.adj_i || type_list.adj_na;
    });
    const plainValid = computed(() => {
      return !(
        type_list.adj_i &&
        !type_list.adj_na &&
        sow.plain &&
        !sow.polite &&
        polarity.affirmative &&
        !polarity.negative &&
        tense.present &&
        !tense.past
      );
    });
    const adjValid = computed(() => {
      return plainValid.value && typeValid.value;
    });
    watch(adjValid, newVal => {
      context.emit('updateAdj', newVal);
    });
    return () => (
      <div class={s.wrapper}>
        <h3>
          <input type='checkbox' v-model={pos.adj} />
          形容词
        </h3>
        {pos.adj ? (
          <>
            <div class={s.relativeBox}>
              <h4 v-show={!typeValid.value}>*你至少需要选择一个类别</h4>
              <h4 v-show={!plainValid.value}>*你不能同时只选择“イ形容词”、“基本形 / 简体”、“现在”、“肯定”</h4>
              <ul>
                {ADJ_TYPE_LIST.map(type => (
                  <li>
                    <input type='checkbox' v-model={type_list[type]} />
                    <span>{BILINGUAL_LIST[type]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class={s.relativeBox}>
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
          </>
        ) : null}
      </div>
    );
  },
});
