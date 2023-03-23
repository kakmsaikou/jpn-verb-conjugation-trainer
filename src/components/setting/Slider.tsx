import { defineComponent, onMounted, ref, watch } from 'vue';
import s from './Slider.module.scss';

export const Slider = defineComponent({
  emits: ['option'],
  setup: (props, context) => {
    const refSelected = ref('罗马音');
    const refSelectedOption = ref<HTMLLabelElement>();
    const refSliderBar = ref<HTMLDivElement>();
    const refSlider = ref<HTMLDivElement>();

    const handleSelect = (option: string) => {
      refSelected.value = option;
    };

    watch(refSelectedOption, val => {
      if (!refSelectedOption.value || !refSliderBar.value || !refSlider.value) return;
      const { width } = refSelectedOption.value.getBoundingClientRect();
      refSliderBar.value.style.width = `${width}px`;
      const { left: left1 } = refSlider.value.getBoundingClientRect();
      const { left: left2 } = refSelectedOption.value?.getBoundingClientRect();
      refSliderBar.value.style.transform = `translateX(${left2 - left1}px)`;
      context.emit('option', refSelected.value);
    });

    const options = ['罗马音', '平假名', '无注音'];
    return () => (
      <div class={s.slider} ref={refSlider}>
        {options.map(option => (
          <label
            class={s.option}
            onClick={() => {
              handleSelect(option);
            }}
            ref={refSelected.value === option ? refSelectedOption : undefined}
          >
            {option}
          </label>
        ))}
        <div class={s.slider_bar} ref={refSliderBar}></div>
      </div>
    );
  },
});

export default Slider;
