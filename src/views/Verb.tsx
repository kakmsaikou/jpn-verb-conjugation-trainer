import { defineComponent, nextTick, reactive, Ref, ref } from 'vue';
import s from './Verb.module.scss';
import { withEventModifiers } from '../plugins/withEventmodifiers';
import { convertVerbForm } from '../utils/convertVerbForm';
import { wordDataList } from '../assets/wordDataList';
import { DailyRecord } from '../components/DailyRecord';
import { getArrayRandomIndex } from '../utils/getRandomIndex';

const getRandomWordData = () => {
  // 当数组可能会在引用过程中篡改数组内容，暂时原因未知
  const randomIndex = getArrayRandomIndex(wordDataList, 3);
  // console.log(`wordDataList[${randomIndex}]:` + wordDataList[randomIndex].kanji);
  return wordDataList[randomIndex];
};

export const Verb = defineComponent({
  setup: () => {
    const wordData = reactive<WordData>(getRandomWordData());

    const refCorrectAnswer: Ref<HTMLParagraphElement | undefined> = ref();
    const refAnswerTag: Ref<HTMLInputElement | undefined> = ref();

    let dailyCorrectCount = 0
    let dailyAnswerCount = 0;

    // convertResult 的返回值格式是 ['食べます', 'たべます']
    const convertResult = reactive<string[]>(
      convertVerbForm(wordData, 'ます形')
    );

    const isAnswerSubmitted = ref(false);

    const refAnswer = ref('');

    const handleSubmitAnswer = (e: KeyboardEvent) => {
      // 这里不禁止冒泡事件的话，下面的 keyup 事件会被触发两次
      e.stopPropagation();
      if (refCorrectAnswer.value === undefined) return;
      const classList = refCorrectAnswer.value.classList;

      isAnswerSubmitted.value = true;
      dailyAnswerCount++;
      // 判断输入的答案是否是汉字或是对应的平假名
      const isAnswerRight = convertResult.includes(refAnswer.value);
      if (isAnswerRight) {
        dailyCorrectCount++;
        classList.add('right');
      } else {
        classList.add('wrong');
      }

      refAnswer.value = '';

      const handleGlobalEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          classList.remove('right', 'wrong');
          isAnswerSubmitted.value = false;
          Object.assign(wordData, getRandomWordData());
          Object.assign(convertResult, convertVerbForm(wordData, 'ます形'));
          document.removeEventListener('keyup', handleGlobalEnter);
          nextTick(() => {
            // 这句不放在 nextTick 里 vue 会把它和 isAnswerSubmitted.value = false 一起执行
            refAnswerTag.value?.focus();
          });
        }
      };

      document.addEventListener('keyup', handleGlobalEnter);
    };

    return () => (
      <div class={s.wrapper}>
        <h1>日语词汇变形练习</h1>
        <div class={s.practiceWrapper}>
          <DailyRecord
            dailyCorrectCount={dailyCorrectCount}
            dailyAnswerCount={dailyAnswerCount}
          />
          <div class={s.questionWrapper}>
            <div class={s.wordWrapper}>
              <h2 class={s.wordText}>{wordData.kanji}</h2>
              <p class={s.meaning}>{wordData.meaning}</p>
            </div>
            <h3 class={s.questionContent}>ます形</h3>
            <p ref={refCorrectAnswer} class={s.correctAnswer}>
              {convertResult[0]}
            </p>
          </div>
          <input
            type='text'
            class={s.answer}
            v-model={refAnswer.value}
            ref={refAnswerTag}
            {...withEventModifiers(
              {
                onKeyup: handleSubmitAnswer,
              },
              ['enter']
            )}
            disabled={isAnswerSubmitted.value}
          />
          <div class={s.settingWrapper}>
            <span class={s.continue}>
              {isAnswerSubmitted.value
                ? '单击 Enter 下一题'
                : '单击 Enter 提交'}
            </span>
          </div>
        </div>
      </div>
    );
  },
});

export default Verb;
