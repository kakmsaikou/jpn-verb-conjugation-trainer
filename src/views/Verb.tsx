import { defineComponent, nextTick, reactive, Ref, ref } from 'vue';
import s from './Verb.module.scss';
import { withEventModifiers } from '../plugins/withEventmodifiers';
import { convertVerbForm } from '../utils/convertVerbForm';
import { wordDataList } from '../assets/wordDataList';

export const Verb = defineComponent({
  setup: (props, context) => {
    const usedIndexes: number[]= []
    const selectedWordData = () => {
      let randomIndex = Math.floor(Math.random() * wordDataList.length);
      // TODO 有点小 BUG，以后再修
      // 保证最近3个单词不重复
      if (usedIndexes.length >= 3) {
        usedIndexes.shift()
      }
      while (usedIndexes.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * wordDataList.length);
      }
      usedIndexes.push(randomIndex);
      return wordDataList[randomIndex];
    };

    const wordData = reactive<WordData>(selectedWordData());

    const refCorrectAnswer: Ref<HTMLParagraphElement | undefined> = ref();
    const refAnswerTag: Ref<HTMLInputElement | undefined> = ref();

    // convertResult 的返回值格式是 ['食べます', 'たべます']
    // 要用返回值来渲染页面的答案，不能写 handleInput里面
    const convertResult = reactive<string[]>(
      convertVerbForm(wordData, 'ます形')
    );

    const isAnswerSubmitted = ref(false);

    const refAnswer = ref('');

    const handleSubmitAnswer = (e: KeyboardEvent) => {
      // 这里不禁止冒泡事件的话，下面的keyup事件会被触发两次
      e.stopPropagation();
      if (refCorrectAnswer.value === undefined) return;
      const classList = refCorrectAnswer.value.classList;

      // 判断输入的答案是否是汉字或是对应的平假名
      const isAnswerRight = convertResult.includes(refAnswer.value);
      classList.add(isAnswerRight ? 'right' : 'wrong');

      isAnswerSubmitted.value = true;
      refAnswer.value = '';

      const handleEnterKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          classList.remove('right', 'wrong');
          isAnswerSubmitted.value = false;
          Object.assign(wordData, selectedWordData());
          Object.assign(convertResult, convertVerbForm(wordData, 'ます形'));
          document.removeEventListener('keyup', handleEnterKey);
          nextTick(() => {
            // 这句不放在 nextTick 里 vue 会把它和 isAnswerSubmitted.value = false 一起执行
            refAnswerTag.value?.focus();
          });
        }
      };

      document.addEventListener('keyup', handleEnterKey);
    };

    return () => (
      <div class={s.wrapper}>
        <h1>日语词汇变形练习</h1>
        <div class={s.practiceWrapper}>
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
