import { defineComponent, PropType } from 'vue';
import s from './Button.module.scss';

export const Button = defineComponent({
  emits: ['click'],
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    const onClick = (e: MouseEvent) => {
      context.emit('click', e);
    };
    return () => (
      <button
        type='button'
        class={s.wrapper}
        onClick={onClick}
        disabled={!props.disabled}
      >
        {context.slots.default?.()}
      </button>
    );
  },
});

export default Button;
