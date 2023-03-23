import { defineComponent, onMounted, ref, watch } from 'vue';
import s from './Slider.module.scss';

export const Slider = defineComponent({
  setup: (props, context) => {
    const refSelected = ref('罗马音');
    const refSelectedOption = ref<HTMLLabelElement>();
    const refSliderBar = ref<HTMLDivElement>();
    const refSlider = ref<HTMLDivElement>();

    const handleSelect = (option: string) => {
      refSelected.value = option;
    };

    watch(refSelectedOption, val => {
      if(!refSelectedOption.value || !refSliderBar.value || !refSlider.value) return
      const { width } = refSelectedOption.value.getBoundingClientRect();
      refSliderBar.value.style.width = `${width}px`;
      const { left: left1 } = refSlider.value.getBoundingClientRect();
      const { left: left2 } = refSelectedOption.value?.getBoundingClientRect();
      refSliderBar.value.style.transform = `translateX(${left2 - left1}px)`;
    });

    return () => (
      <div class={s.slider} ref={refSlider}>
        <label
          class={s.option}
          onClick={() => {
            handleSelect('罗马音');
          }}
          ref={refSelected.value === '罗马音' ? refSelectedOption : undefined}
        >
          罗马音
        </label>
        <label
          class={s.option}
          onClick={() => {
            handleSelect('平假名');
          }}
          ref={refSelected.value === '平假名' ? refSelectedOption : undefined}
        >
          平假名
        </label>
        <label
          class={s.option}
          onClick={() => {
            handleSelect('无注音');
          }}
          ref={refSelected.value === '无注音' ? refSelectedOption : undefined}
        >
          无注音
        </label>
        <div class={s.slider_bar} ref={refSliderBar}></div>
      </div>
    );
  },
});

export default Slider;
