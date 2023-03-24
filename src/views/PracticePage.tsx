import { defineComponent, nextTick, onMounted, Ref, ref } from 'vue';
import s from './PracticePage.module.scss';
import { withEventModifiers } from '../plugins/withEventmodifiers';
import { DailyRecord } from '../components/practice/DailyRecord';
import Button from '../components/Button';
import { useWordStore } from '../stores/useWordStore';
import { bind, isJapanese } from 'wanakana';
import { RouterLink } from 'vue-router';
import Flashcard from '../components/practice/Flashcard';
import { useDailyRecord } from '../utils/useDailyRecord';
import { useVoice } from '../utils/useVoice';

export const PracticePage = defineComponent({
  setup: () => {
    const wordStore = useWordStore();

    const refCorrectAnswer: Ref<HTMLParagraphElement | undefined> = ref();
    const refAnswer: Ref<HTMLInputElement | undefined> = ref();
    const refTooltip: Ref<HTMLParagraphElement | undefined> = ref();
    const isAnswerSubmitted = ref(false);

    onMounted(() => {
      bind(refAnswer.value as HTMLInputElement);
      if (refAnswer.value) {
        refAnswer.value.value = '';
      }
    });

    const dailyRecord = useDailyRecord();
    const voices = useVoice();

    const handleSubmitAnswer = (e: KeyboardEvent) => {
      // 这里不禁止冒泡事件的话，下面的 keyup 事件会被触发两次
      e.stopPropagation();
      if (refCorrectAnswer.value === undefined || refAnswer.value === undefined) return;
      if (isJapanese(refAnswer.value.value) === false) {
        refTooltip.value?.classList.add(s.visible);
        setTimeout(() => {
          refTooltip.value?.classList.remove(s.visible);
        }, 4000);
        return;
      }

      voices.speak(wordStore.answerKana);

      const { classList } = refCorrectAnswer.value;
      isAnswerSubmitted.value = true;
      dailyRecord.addAnswer();

      // 判断输入的答案是否是汉字或是对应的平假名
      const isAnswerCorrect = wordStore.isAnswerCorrect(refAnswer.value.value);
      const handleGlobalEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          classList.remove('correct', 'wrong');
          isAnswerSubmitted.value = false;
          wordStore.refreshWord();
          document.removeEventListener('keyup', handleGlobalEnter);
          if (isAnswerCorrect === false && refAnswer.value !== undefined) {
            refAnswer.value.value = '';
          }
          nextTick(() => {
            // 这句不放在 nextTick 里 vue 会把它和 isAnswerSubmitted.value = false 一起执行
            refAnswer.value?.focus();
          });
        }
      };
      if (isAnswerCorrect) {
        dailyRecord.addCorrect();
        classList.add('correct');
        refCorrectAnswer.value.innerText = refAnswer.value.value;
        document.addEventListener('keyup', handleGlobalEnter);
        refAnswer.value.value = '';
      } else {
        classList.add('wrong');
        refCorrectAnswer.value.innerText = wordStore.answer;
        setTimeout(() => {
          document.addEventListener('keyup', handleGlobalEnter);
        }, 400);
      }
    };
    return () => (
      <div>
        <DailyRecord dailyCorrectCount={dailyRecord.record.correct} dailyAnswerCount={dailyRecord.record.answer} />
        <Flashcard isTypeShown={isAnswerSubmitted.value} />
        <p ref={refCorrectAnswer} class={s.correctAnswer} />
        <div class={s.inputWrapper}>
          <p class={s.tooltip} ref={refTooltip}>
            只能输入汉字或者对应的平假名。
          </p>
          <input
            type='text'
            class={s.answer}
            ref={refAnswer}
            {...withEventModifiers(
              {
                onKeyup: handleSubmitAnswer,
              },
              ['enter']
            )}
            disabled={isAnswerSubmitted.value}
          />
        </div>
        <div class={s.settingWrapper}>
          <Button style='visibility: hidden'>設定 ⚙️</Button>
          <span class={s.continue}>{isAnswerSubmitted.value ? '单击 Enter 下一题' : '单击 Enter 提交'}</span>
          <RouterLink to={'/setting'} replace={true}>
            <Button>設定 ⚙️</Button>
          </RouterLink>
        </div>
      </div>
    );
  },
});

export default PracticePage;
