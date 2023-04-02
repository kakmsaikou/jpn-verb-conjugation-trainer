import { computed, defineComponent, PropType, watch } from 'vue';
import { ADJ_TENSE_LIST, ADJ_TYPE_LIST, BILINGUAL_LIST } from '../../const';
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

    const typeValid = computed(() => {
      return adj.adj_i || adj.adj_na;
    });
    const tenseValid = computed(() => {
      const validTenseList = ADJ_TENSE_LIST.filter(tense => adj[tense] === true);
      return validTenseList.length > 0;
    });
    const adjValid = computed(() => {
      return typeValid.value && tenseValid.value;
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
              <ul>
                {ADJ_TYPE_LIST.map(type => (
                  <li>
                    <input type='checkbox' v-model={adj[type]} />
                    <span>{BILINGUAL_LIST[type]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class={s.relativeBox}>
              <h4 v-show={!tenseValid.value}>*你至少需要选择一个类别</h4>
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
          </>
        ) : null}
      </div>
    );
  },
});
