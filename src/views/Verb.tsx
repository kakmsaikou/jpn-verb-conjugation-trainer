import { defineComponent, nextTick, reactive, Ref, ref } from 'vue';
import s from './Verb.module.scss';
import { withEventModifiers } from '../plugins/withEventmodifiers';
import { convertVerbForm } from '../utils/convertVerbForm';
import { wordDataList } from '../assets/wordDataList';
import { DailyRecord } from '../components/DailyRecord';
import { getArrayRandomIndex } from '../utils/getRandomIndex';

let lastWord = '';

const getRandomWordData = () => {
  const randomIndex = getArrayRandomIndex(wordDataList, 3);
  // 下面这段你可能会觉得我在脱裤子放屁。但如果不这么写的话，会出现内存内数组被篡改导致连续两次出现同一个单词的情况
  if (lastWord === wordDataList[randomIndex].kanji) {
    return randomIndex > 1 ? wordDataList[randomIndex - 1] : wordDataList[randomIndex + 1];
  }
  lastWord = wordDataList[randomIndex].kanji;
  // console.log(`wordDataList[${randomIndex}]:` + wordDataList[randomIndex].kanji);
  return wordDataList[randomIndex];
};

const wordFormList = ['ます形', 'て形', 'た形'];
const excludeWordFormList = []

const getRandomWordForm = () => {
  const randomIndex = Math.floor(Math.random() * wordFormList.length);
  return wordFormList[randomIndex];
};

export const Verb = defineComponent({
  setup: () => {
    const wordData = reactive<WordData>(getRandomWordData());

    const refCorrectAnswer: Ref<HTMLParagraphElement | undefined> = ref();
    const refAnswer: Ref<HTMLInputElement | undefined> = ref();

    const refQuestionWordForm = ref(getRandomWordForm());

    // 写这句话单纯只是为了消除报错
    // 不要写在 return 里面，不然每次渲染都会执行一次进而会导致答错情况输入框自动清空
    if (refAnswer.value) {
      refAnswer.value.value = '';
    }

    let dailyCorrectCount = 0;
    let dailyAnswerCount = 0;

    // convertResult 的返回值格式是 ['食べます', 'たべます']
    const convertResult = reactive<string[]>(convertVerbForm(wordData, refQuestionWordForm.value));

    const isAnswerSubmitted = ref(false);

    const handleSubmitAnswer = (e: KeyboardEvent) => {
      // 这里不禁止冒泡事件的话，下面的 keyup 事件会被触发两次
      e.stopPropagation();
      if (refCorrectAnswer.value === undefined || refAnswer.value === undefined) return;

      const { classList } = refCorrectAnswer.value;
      isAnswerSubmitted.value = true;
      dailyAnswerCount++;

      // 判断输入的答案是否是汉字或是对应的平假名
      const isAnswerRight = convertResult.includes(refAnswer.value.value);
      const handleGlobalEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          classList.remove('right', 'wrong');
          isAnswerSubmitted.value = false;
          refQuestionWordForm.value = getRandomWordForm();
          Object.assign(wordData, getRandomWordData());
          Object.assign(convertResult, convertVerbForm(wordData, refQuestionWordForm.value));
          document.removeEventListener('keyup', handleGlobalEnter);
          if (isAnswerRight === false && refAnswer.value !== undefined) {
            refAnswer.value.value = '';
          }
          nextTick(() => {
            // 这句不放在 nextTick 里 vue 会把它和 isAnswerSubmitted.value = false 一起执行
            refAnswer.value?.focus();
          });
        }
      };
      if (isAnswerRight) {
        dailyCorrectCount++;
        classList.add('right');
        refCorrectAnswer.value.innerText = refAnswer.value.value;
        document.addEventListener('keyup', handleGlobalEnter);
        refAnswer.value.value = '';
      } else {
        classList.add('wrong');
        refCorrectAnswer.value.innerText =
          convertResult[0] === convertResult[1] ? convertResult[0] : convertResult[0] + '\n' + convertResult[1];
        setTimeout(() => {
          document.addEventListener('keyup', handleGlobalEnter);
        }, 400);
      }
    };

    const isOptionsVisible = ref(false);
    return () => (
      <div class={s.wrapper}>
        <button
          onClick={() => {
            isOptionsVisible.value = !isOptionsVisible.value;
          }}
        >
          options
        </button>
        <h1>日语词汇变形练习</h1>
        <div class={s.practiceWrapper} v-show={!isOptionsVisible.value}>
          <DailyRecord dailyCorrectCount={dailyCorrectCount} dailyAnswerCount={dailyAnswerCount} />
          <div class={s.questionWrapper}>
            <div class={s.wordWrapper}>
              <p class={s.kana}>{wordData.kanji === wordData.kana ? '　' : wordData.kana}</p>
              <h2 class={s.wordText}>{wordData.kanji}</h2>
              <p class={s.meaning}>{wordData.meaning}</p>
            </div>
            <h3 class={s.questionContent}>{refQuestionWordForm.value}</h3>
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
            <span class={s.continue}>{isAnswerSubmitted.value ? '单击 Enter 下一题' : '单击 Enter 提交'}</span>
          </div>
        </div>
        <div class={s.optionsWrapper} v-show={isOptionsVisible.value}>
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
      </div>
    );
  },
});

export default Verb;
