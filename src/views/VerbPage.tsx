import { defineComponent } from 'vue';
import s from './VerbPAge.module.scss';

export const VerbPAge = defineComponent({
  setup: (props, context) => {
    return () => <div class={s.wrapper}>
      <h1>食べる</h1>
      <form action="">
        <ul>
          <li class={s.radioList}>
                      <label>
            <input type="radio" value='一类动词' name='wordType'/>
            <span>一类动词</span>
          </label>
          <label>
            <input type="radio" value='二类动词' name='wordType'/>
            <span>二类动词</span>
          </label>
          <label>
            <input type="radio" value='三类动词' name='wordType'/>
            <span>三类动词</span>
          </label>
          </li>
        </ul>
        <div>
          <span>ます形：</span>
          <input type="text" />
          <span>答案：<em>食べます</em></span>
        </div>
        <div>
          <span>　て形：</span>
          <input type="text" />
          <span>答案：<em>食べて</em></span>
        </div>
        <div>
          <span>　た形：</span>
          <input type="text" />
          <span>答案：<em>食べた</em></span>
        </div>
        <div>
          <span>ない形：</span>
          <input type="text" />
          <span>答案：<em>食べない</em></span>
        </div>
        <button type='submit'>提交</button>
      </form>
    </div>;
  },
});

export default VerbPAge;