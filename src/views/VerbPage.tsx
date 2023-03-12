import { defineComponent, reactive } from 'vue';
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
    const onSubmit = (e: Event) => {
      e.preventDefault();
      console.log(answer);
    };
    return () => (
      <div class={s.wrapper}>
        <h1>食べる</h1>
        <form action=''>
          <div class={s.radioList}>
            <label>
              <input type='radio' value='一类动词' v-model={answer.verbType} name='verbType' />
              <span>一类动词</span>
            </label>
            <label>
              <input type='radio' value='二类动词' v-model={answer.verbType}  name='verbType' />
              <span>二类动词</span>
            </label>
            <label>
              <input type='radio' value='三类动词'  v-model={answer.verbType} name='verbType' />
              <span>三类动词</span>
            </label>
            <span>
              答案：<em>食べます</em>
            </span>
          </div>
          <div>
            <span>ます形：</span>
            <input type='text' v-model={answer.masu}/>
            <span>
              答案：<em>食べます</em>
            </span>
          </div>
          <div>
            <span>　て形：</span>
            <input type='text' v-model={answer.te}/>
            <span>
              答案：<em>食べて</em>
            </span>
          </div>
          <div>
            <span>　た形：</span>
            <input type='text' v-model={answer.ta}/>
            <span>
              答案：<em>食べた</em>
            </span>
          </div>
          <div>
            <span>ない形：</span>
            <input type='text' v-model={answer.nai}/>
            <span>
              答案：<em>食べない</em>
            </span>
          </div>
          <button type='submit' onClick={onSubmit}>提交</button>
        </form>
      </div>
    );
  },
});

export default VerbPAge;
