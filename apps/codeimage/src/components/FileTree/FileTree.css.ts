import {createVar, style} from '@vanilla-extract/css';

export const textColorVar = createVar();
export const backgroundColorVar = createVar();

export const container = style({
  padding: '12px 8px',
  fontFamily: 'inherit',
  fontSize: '13px',
  lineHeight: '22px',
  color: textColorVar,
  backgroundColor: backgroundColorVar,
  minHeight: '100%',
  boxSizing: 'border-box',
});
