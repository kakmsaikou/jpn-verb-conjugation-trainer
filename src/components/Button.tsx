import { defineComponent, PropType } from 'vue';
import s from './Button.module.scss';

export const Button = defineComponent({
  props: {
    onClick: Function as PropType<(e: MouseEvent) => void>,
    disabled: Boolean,
  },
  setup: (props, context) => {
    const onClick = (e: MouseEvent) => {
      props.onClick?.(e);
    };
    return () => (
      <button class={s.backBtn} onClick={onClick} disabled={!props.disabled}>
        {context.slots.default?.()}
      </button>
    );
  },
});

export default Button;
