import { defineComponent } from 'vue';
import { useWordStore } from '../../stores/useWordStore';
import s from './Flashcard.module.scss';

export const Flashcard = defineComponent({
  props: {
    isTypeShown: {
      type: Boolean,
      required: true,
    },
  },
  setup: (props, context) => {
    const wordStore = useWordStore();
    return () => (
      <div class={s.questionWrapper}>
        <div class={s.wordWrapper}>
          <p class={s.kana}>{wordStore.kanji === wordStore.kana ? '　' : wordStore.kana}</p>
          <h2 class={s.wordText}>{wordStore.kanji}</h2>
          <p class={s.meaning}>{wordStore.meaning}</p>
          <p class={s.type}>{props.isTypeShown ? wordStore.type : '　'}</p>
        </div>
        <h3 class={s.questionContent}>{wordStore.formKanji}</h3>
      </div>
    );
  },
});

export default Flashcard;
