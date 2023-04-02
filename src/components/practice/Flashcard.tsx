import { defineComponent } from 'vue';
import { toRomaji } from 'wanakana';
import { useConfigStore } from '../../stores/useConfigStore';
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
    const configStore = useConfigStore();
    return () => (
      <div class={s.questionWrapper}>
        <div class={s.wordWrapper}>
          <p class={s.kana}>
            {configStore.config.pron === '无注音'
              ? '　'
              : wordStore.selectWordData.kanji === wordStore.selectWordData.kana
              ? '　'
              : configStore.config.pron === '平假名'
              ? wordStore.selectWordData.kana
              : toRomaji(wordStore.selectWordData.kana)}
          </p>
          <h2 class={s.wordText}>{wordStore.selectWordData.kanji}</h2>
          <p class={s.meaning}>{wordStore.selectWordData.meaning}</p>
          <p class={s.type}>{props.isTypeShown ? wordStore.formattedType : '　'}</p>
        </div>
        <h3 class={s.questionContent}>{wordStore.formattedKanji}</h3>
      </div>
    );
  },
});

export default Flashcard;
