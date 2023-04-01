import { computed, defineComponent, PropType, Ref, watch } from 'vue';
import { ADJ_TENSE_LIST, ADJ_TYPE_LIST, BILINGUAL_LIST, POLARITY_LIST, SOW_LIST, TENSE_LIST } from '../../const';
import { handleCheckbox } from '../../utils/handleCheckbox';
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

    const adjVoiceList = [SOW_LIST, TENSE_LIST, POLARITY_LIST];

    const typeValid = computed(() => {
      return adj.adj_i || adj.adj_na;
    });
    const plainValid = computed(() => {
      return !(
        adj.adj_i &&
        !adj.adj_na &&
        adj.plain &&
        !adj.polite &&
        adj.affirmative &&
        !adj.negative &&
        adj.present &&
        !adj.past
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
                    <input type='checkbox' v-model={adj[type]} />
                    <span>{BILINGUAL_LIST[type]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {ADJ_TENSE_LIST.map(tense => {
                  return (
                    <li>
                      <input type='checkbox' v-model={adj[tense]} />
                      <span>{BILINGUAL_LIST[tense]}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div class={s.relativeBox}>
              {adjVoiceList.map(item => {
                return (
                  <ul>
                    {item.map(key => {
                      return (
                        <li>
                          <input
                            type='checkbox'
                            v-model={adj[key]}
                            onChange={() => {
                              handleCheckbox(adj, key);
                            }}
                          />
                          <span>{BILINGUAL_LIST[key]}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    );
  },
});
