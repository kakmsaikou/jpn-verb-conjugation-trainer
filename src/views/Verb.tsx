import { defineComponent, reactive, Ref, ref } from 'vue';
import s from './Verb.module.scss';
import { withEventModifiers } from '../plugins/withEventmodifiers';
import { convertVerbForm } from '../utils/convertVerbForm';

export const Verb = defineComponent({
  setup: (props, context) => {
    const wordData1 = reactive<WordData>({
      kanji: 'やる',
      kana: 'やる',
      type: 'v5',
    });
    const wordData2 = reactive<WordData>({
      kanji: '食べる',
      kana: 'たべる',
      type: 'v1',
    });

    const refCorrectAnswer: Ref<HTMLParagraphElement | undefined> = ref();

    // convertResult 的返回值格式是 ['食べます', 'たべます']
    // 要用返回值来渲染页面的答案，不能写 handleInput里面
    const convertResult = convertVerbForm(wordData1, 'ます形');

    const handleInput = (e: KeyboardEvent) => {
      // 这里不断言 TS 会报错
      const answer = (e.target as HTMLInputElement).value;

      if (refCorrectAnswer.value === undefined) return;
      const classList = refCorrectAnswer.value.classList;
      classList.remove('right', 'wrong');

      // 判断输入的答案是否是汉字或是对应的平假名
      const isAnswerRight = convertResult.includes(answer);
      classList.add(isAnswerRight ? 'right' : 'wrong');
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
              <h2 class={s.wordText}>やる</h2>
              <p class={s.meaning}>做、给</p>
            </div>
            <h3 class={s.questionContent}>ます形</h3>
            <p ref={refCorrectAnswer} class={s.correctAnswer}>
              {convertResult[0]}
            </p>
          </div>
          <input
            type='text'
            class={s.answer}
            {...withEventModifiers(
              {
                onKeyup: handleInput,
              },
              ['enter']
            )}
          />
          <div class={s.settingWrapper}>
            <span class={s.continue}>单击 Enter 继续</span>
          </div>
        </div>
      </div>
    );
  },
});

export default Verb;
