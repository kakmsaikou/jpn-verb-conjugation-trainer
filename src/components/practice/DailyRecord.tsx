import { defineComponent } from 'vue';
import s from './DailyRecord.module.scss';

export const DailyRecord = defineComponent({
  props: {
    dailyCorrectCount: {
      type: Number,
      required: true,
    },
    dailyAnswerCount: {
      type: Number,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.record}>
        <div class={s.correctCount}>
          <p>今日正确</p>
          <p>{props.dailyCorrectCount}</p>
        </div>
        <div class={s.practiceCount}>
          <p>今日练习</p>
          <p>{props.dailyAnswerCount}</p>
        </div>
      </div>
    );
  },
});
