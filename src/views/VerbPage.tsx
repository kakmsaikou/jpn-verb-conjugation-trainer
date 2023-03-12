import { defineComponent } from 'vue';
import s from './VerbPAge.module.scss';

export const VerbPAge = defineComponent({
  setup: (props, context) => {
    return () => <div class={s.wrapper}>
      <h1>食べる</h1>
      <form action="">
        <div class={s.radioList}>
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
        </div>
      </form>
    </div>;
  },
});

export default VerbPAge;