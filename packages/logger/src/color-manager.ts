import {NODE_MODE} from './core';

export const colors = {
  browsers: {
    RED: '#EF5350',
    PINK: '#F06292',
    PURPLE: '#AB47BC',
    DEEP_PURPLE: '#7E57C2',
    INDIGO: '#5C6BC0',
    BLUE: '#42A5F5',
    LIGHT_BLUE: '#03A9F4',
    CYAN: '#26C6DA',
    TEAL: '#009688',
    GREEN: '#4CAF50',
    LIGHT_GREEN: '#8BC34A',
    LIME: '#CDDC39',
    YELLOW: '#FDD835',
    AMBER: '#FFC107',
    ORANGE: '#FF9800',
  },
  node: ['0;36', '0;35', '0;34', '0;33', '0;32'],
};

const colorsList = NODE_MODE ? colors.node : Object.values(colors.browsers);
let colorIndex = 0;

export function getColor(): string {
  const color = colorsList[colorIndex];

  colorIndex++;

  if (colorIndex >= colorsList.length) {
    colorIndex = 0;
  }

  return color;
}
