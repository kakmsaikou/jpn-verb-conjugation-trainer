import { defineComponent, reactive, ref } from 'vue';
import s from './VerbPAge.module.scss';

type WordData = {
  word: string;
  verbDetail: {
    verb_type: string;
    masu: string;
    te: string;
    ta: string;
    nai: string;
    [key: string]: string;
  };
};

export const VerbPAge = defineComponent({
  setup: (props, context) => {
    // 外面传的，不能改变
    const wordData: WordData = reactive({
      word: '食べる',
      verbDetail: {
        verb_type: '一类动词',
        masu: '食べます',
        te: '食べて',
        ta: '食べた',
        nai: '食べない',
      },
    });
    const {verbDetail} = wordData;
    const answer: Record<string, string> = reactive({
      verb_type: '',
      masu: '',
      te: '',
      ta: '',
      nai: '',
    });
    const isAnswerVisible = ref(false);
    const errorList: Record<string, boolean> = reactive({
      verb_type: true,
      masu: true,
      te: true,
      ta: true,
      nai: true,
    });
    const onSubmit = (e: Event) => {
      e.preventDefault();
      isAnswerVisible.value = true;
      let errorCount = 0;
      for (let key in wordData) {
        if (wordData.verbDetail[key] !== answer[key]) {
          errorCount++;
          errorList[key] = false;
        } else {
          errorList[key] = true;
        }
      }
      if (errorCount === 0) {
        alert('全部正确');
      } else {
        alert('有错误');
      }
    };
    const verbTypeList = [
      { label: '一类动词', value: '一类动词' },
      { label: '二类动词', value: '二类动词' },
      { label: '三类动词', value: '三类动词' },
    ];
    const conjugatedVerbList = [
      { conjugation: 'ます形', value: 'masu' },
      { conjugation: 'て形', value: 'te' },
      { conjugation: 'た形', value: 'ta' },
      { conjugation: 'ない形', value: 'nai' },
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
                  v-model={answer.verb_type}
                  name='verbType'
                />
                <span>{item.label}</span>
              </label>
            ))}
            <span>
              答案：
              <em
                class={errorList.verb_type ? s.right : s.wrong}
                v-show={isAnswerVisible.value}
              >
                {wordData.verbDetail.verb_type}
              </em>
            </span>
          </div>
          {conjugatedVerbList.map(item => (
            <div>
              <span>{item.conjugation}：</span>
              <input type='text' v-model={answer[item.value]} />
              <span>
                答案：
                <em
                  class={errorList[item.value] ? s.right : s.wrong}
                  v-show={isAnswerVisible.value}
                >
                  {wordData.verbDetail[item.value]}
                </em>
              </span>
            </div>
          ))}
          <button type='submit' onClick={onSubmit}>
            提交
          </button>
        </form>
      </div>
    );
  },
});

export default VerbPAge;
