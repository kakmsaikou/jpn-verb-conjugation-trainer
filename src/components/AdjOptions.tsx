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
            <ul>
              <li>
                <input
                  type='checkbox'
                  v-model={sow.plain}
                  onChange={() => {
                    handleCheckbox(sow, 'polite');
                  }}
                />
                <span>简体</span>
              </li>
              <li>
                <input
                  type='checkbox'
                  v-model={sow.polite}
                  onChange={() => {
                    handleCheckbox(sow, 'plain');
                  }}
                />
                <span>敬体</span>
              </li>
            </ul>
            <ul>
              <li>
                <input
                  type='checkbox'
                  v-model={tense.present}
                  onChange={() => {
                    handleCheckbox(tense, 'past');
                  }}
                />
                <span>现在</span>
              </li>
              <li>
                <input
                  type='checkbox'
                  v-model={tense.past}
                  onChange={() => {
                    handleCheckbox(tense, 'present');
                  }}
                />
                <span>过去</span>
              </li>
            </ul>
            <ul>
              <li>
                <input
                  type='checkbox'
                  v-model={polarity.affirmative}
                  onChange={() => {
                    handleCheckbox(polarity, 'negative');
                  }}
                />
                <span>肯定</span>
              </li>
              <li>
                <input
                  type='checkbox'
                  v-model={polarity.negative}
                  onChange={() => {
                    handleCheckbox(polarity, 'affirmative');
                  }}
                />
                <span>否定</span>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  },
});
