import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import s from './App.module.scss';
import './App.scss';

export const App = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <h1>日语词汇变形练习</h1>
        <RouterView class={s.childWrapper} />
      </div>
    );
  },
});

export default App;
