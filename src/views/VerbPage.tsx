import { defineComponent, reactive, ref } from 'vue';
import s from './VerbPAge.module.scss';

export const VerbPAge = defineComponent({
  setup: (props, context) => {
    const verbDetail = reactive({
      verbType: ['一类动词', undefined],
      masu: ['食べます', undefined],
      te: ['食べて', undefined],
      ta: ['食べた', undefined],
      nai: ['食べない', undefined],
    });
    const answer = reactive({
      verbType: '',
      masu: '',
      te: '',
      ta: '',
      nai: '',
    });
    const isAnswerVisible = ref(false);
    const onSubmit = (e: Event) => {
      e.preventDefault();
      console.log(answer);
      isAnswerVisible.value = true;
    };
    const verbTypeList = [
      { label: '一类动词', value: '一类动词' },
      { label: '二类动词', value: '二类动词' },
      { label: '三类动词', value: '三类动词' },
    ];
    return () => (
      <div class={s.wrapper}>
        <h1>食べる</h1>
        <form action=''>
          <div class={s.radioList}>
            {verbTypeList.map(item => (
              <label>
                <input
                  type='radio'
                  value={item.value}
                  v-model={answer.verbType}
                  name='verbType'
                />
                <span>{item.label}</span>
              </label>
            ))}
            <span>
              答案：<em v-show={isAnswerVisible.value}>{verbDetail.verbType}</em>
            </span>
          </div>
          <div>
            <span>ます形：</span>
            <input type='text' v-model={answer.masu} />
            <span>
              答案：<em v-show={isAnswerVisible.value}>{verbDetail.masu}</em>
            </span>
          </div>
          <div>
            <span>　て形：</span>
            <input type='text' v-model={answer.te} />
            <span>
              答案：<em v-show={isAnswerVisible.value}>{verbDetail.te}</em>
            </span>
          </div>
          <div>
            <span>　た形：</span>
            <input type='text' v-model={answer.ta} />
            <span>
              答案：<em v-show={isAnswerVisible.value}>{verbDetail.ta}</em>
            </span>
          </div>
          <div>
            <span>ない形：</span>
            <input type='text' v-model={answer.nai} />
            <span>
              答案：<em v-show={isAnswerVisible.value}>{verbDetail.nai}</em>
            </span>
          </div>
          <button type='submit' onClick={onSubmit}>
            提交
          </button>
        </form>
      </div>
    );
  },
});

export default VerbPAge;
