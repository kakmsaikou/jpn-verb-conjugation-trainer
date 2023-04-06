import { defineComponent, watch } from 'vue';
import s from './DailyRecord.module.scss';
import { ElMessageBox } from 'element-plus';
import { useConfigStore } from '../../stores/useConfigStore';

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
    const configStore = useConfigStore();
    watch(props, (newVal, oldVal) => {
      if (
        configStore.config.target > 0 &&
        props.dailyAnswerCount === configStore.config.target
      ) {
        const percentage =
          Math.round(
            (props.dailyCorrectCount / props.dailyAnswerCount) * 10000
          ) /
            100 +
          '%';
        ElMessageBox.alert(
          `
        已完成今日的答题目标，
        <br>
        今日的正确率是 ${percentage}，
        <br>
        可以选择继续练习或结束今日的练习。
        `,
          '',
          {
            confirmButtonText: 'OK',
            dangerouslyUseHTMLString: true,
          }
        );
      }
    });
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
