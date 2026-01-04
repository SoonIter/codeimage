import {style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '22px',
  paddingRight: '12px',
  cursor: 'pointer',
  userSelect: 'none',
  color: 'inherit',
  opacity: 0.8,
  transition: 'opacity 0.1s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 1,
  },
});

export const chevron = recipe({
  base: {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.15s ease',
  },
  variants: {
    expanded: {
      true: {
        transform: 'rotate(90deg)',
      },
      false: {
        transform: 'rotate(0deg)',
      },
    },
  },
});

export const iconWrapper = style({
  display: 'inline-flex',
  flexShrink: 0,
  width: '16px',
  height: '16px',
  alignItems: 'center',
  justifyContent: 'center',
});

export const name = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const children = style({
  display: 'flex',
  flexDirection: 'column',
});
