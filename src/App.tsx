import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import s from './App.module.scss';
import './App.scss';

export const App = defineComponent({
  setup: (props, context) => {
    return () => <RouterView />;
  },
});

export default App;
