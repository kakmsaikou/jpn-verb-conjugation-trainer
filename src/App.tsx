import { defineComponent } from 'vue';
import s from './App.module.scss';
import './App.scss';

export const App = defineComponent({
  setup: (props, context) => {
    return () => <div>App</div>;
  },
});

export default App;