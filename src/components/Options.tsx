import { defineComponent } from 'vue';
import s from './Options.module.scss';

export const Options = defineComponent({
  props:{
    isOptionsVisible: {
      type: Boolean,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper} v-show={props.isOptionsVisible}>
        <h2>设置</h2>
        <form class={s.optionsForm}>
          <h3>动词</h3>
          <ul>
            <li>
              <input type='checkbox' />
              <span>ます形</span>
            </li>
            <li>
              <input type='checkbox' />
              <span>て形</span>
            </li>
            <li>
              <input type='checkbox' />
              <span>た形</span>
            </li>
          </ul>
        </form>
      </div>
    );
  },
});

export default Options;
