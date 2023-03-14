import { defineComponent } from 'vue';
import s from './DailyRecord.module.scss';

export const DailyRecord = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.record}>
        <div class={s.correctCount}>
          <p>今日正确</p>
          <p>80</p>
        </div>
        <div class={s.practiceCount}>
          <p>今日练习</p>
          <p>100</p>
        </div>
      </div>
    );
  },
});

export default DailyRecord;
