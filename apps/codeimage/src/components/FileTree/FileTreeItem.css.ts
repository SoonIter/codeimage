import {style} from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  flexDirection: 'column',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '2px 4px',
  borderRadius: '4px',
  cursor: 'default',
  userSelect: 'none',
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
