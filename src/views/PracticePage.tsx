import { defineComponent, nextTick, Ref, ref } from 'vue';
import s from './PracticePage.module.scss';
import { withEventModifiers } from '../plugins/withEventmodifiers';
import { DailyRecord } from '../components/DailyRecord';
import { useFormStore } from '../stores/useFormStore';
import { useWordDataStore } from '../stores/useWordData';
import { useCorrectAnswerStore } from '../stores/useCorrectAnswer';
import { Options } from '../components/Options';
import Button from '../components/Button';
import { test } from '../utils/createForm';


test()

export const PracticePage = defineComponent({
  setup: () => {
    const formStore = useFormStore();
    const wordDataStore = useWordDataStore();
    const correctAnswerStore = useCorrectAnswerStore();

    // refCorrectAnswer 要用于修改 classList.add() / classList.remove()
    // refAnswer 要用于 focus()
    const refCorrectAnswer: Ref<HTMLParagraphElement | undefined> = ref();
    const refAnswer: Ref<HTMLInputElement | undefined> = ref();

    // 写这句话单纯只是为了消除报错
    // 不要写在 return 里面，不然每次渲染都会执行一次进而会导致答错情况输入框自动清空
    if (refAnswer.value) {
      refAnswer.value.value = '';
    }

    let dailyCorrectCount = 0;
    let dailyAnswerCount = 0;

    const isAnswerSubmitted = ref(false);

    const handleSubmitAnswer = (e: KeyboardEvent) => {
      // 这里不禁止冒泡事件的话，下面的 keyup 事件会被触发两次
      e.stopPropagation();
      if (refCorrectAnswer.value === undefined || refAnswer.value === undefined) return;

      const { classList } = refCorrectAnswer.value;
      isAnswerSubmitted.value = true;
      dailyAnswerCount++;

      // 判断输入的答案是否是汉字或是对应的平假名
      const isAnswerCorrect = correctAnswerStore.isAnswerCorrect(refAnswer.value.value);
      const handleGlobalEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          classList.remove('correct', 'wrong');
          isAnswerSubmitted.value = false;
          correctAnswerStore.refreshCorrectAnswer();
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
        dailyCorrectCount++;
        classList.add('correct');
        refCorrectAnswer.value.innerText = refAnswer.value.value;
        document.addEventListener('keyup', handleGlobalEnter);
        refAnswer.value.value = '';
      } else {
        classList.add('wrong');
        refCorrectAnswer.value.innerText = correctAnswerStore.isKanjiKanaEqual
          ? correctAnswerStore.kana
          : correctAnswerStore.kana + '\n' + correctAnswerStore.kanji;
        setTimeout(() => {
          document.addEventListener('keyup', handleGlobalEnter);
        }, 400);
      }
    };

    const isOptionsVisible = ref(false);
    const turnOptions = (status: boolean) => {
      isOptionsVisible.value = status;
    };
    const onClick = (e: MouseEvent) => {
      turnOptions(true);
    };
    return () => (
      <div class={s.wrapper}>
        <h1>日语词汇变形练习</h1>
        <div class={s.practiceWrapper} v-show={!isOptionsVisible.value}>
          <DailyRecord dailyCorrectCount={dailyCorrectCount} dailyAnswerCount={dailyAnswerCount} />
          <div class={s.questionWrapper}>
            <div class={s.wordWrapper}>
              <p class={s.kana}>{wordDataStore.kanji === wordDataStore.kana ? '　' : wordDataStore.kana}</p>
              <h2 class={s.wordText}>{wordDataStore.kanji}</h2>
              <p class={s.meaning}>{wordDataStore.meaning}</p>
            </div>
            <h3 class={s.questionContent}>{formStore.formKanji}</h3>
            <p ref={refCorrectAnswer} class={s.correctAnswer} />
          </div>
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
          <div class={s.settingWrapper}>
            <Button style='visibility: hidden'>設定 ⚙️</Button>
            <span class={s.continue}>{isAnswerSubmitted.value ? '单击 Enter 下一题' : '单击 Enter 提交'}</span>
            <Button onClick={onClick}>設定 ⚙️</Button>
          </div>
        </div>
        <Options v-show={isOptionsVisible.value} onClose={turnOptions} />
      </div>
    );
  },
});

export default PracticePage;
