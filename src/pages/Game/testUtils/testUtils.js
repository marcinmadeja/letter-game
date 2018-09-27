import * as mainUtils from 'utils/utils';
import { ITEM_TYPES } from '../constants';

export const isValidLetterItem = (item) => {
  const pointsValid = !Number.isNaN(item.points);
  const typeValid = item.type === ITEM_TYPES.letter;
  const nameValid = mainUtils.isLetter(item.name);

  return (pointsValid && typeValid && nameValid);
};

export const isValidNumberItem = (item) => {
  const typeValid = item.type === ITEM_TYPES.number;
  const nameValid = !Number.isNaN(item.name);

  return typeValid && nameValid;
};

export const isValidTimeBonus = (item) => {
  const typeValid = item.type === ITEM_TYPES.timeBonus;
  const nameValid = item.name === 'bonus';

  return typeValid && nameValid;
};

export const isValidTimePenalty = (item) => {
  const typeValid = item.type === ITEM_TYPES.timePenalty;
  const nameValid = item.name === 'penalty';

  return typeValid && nameValid;
};

export const isValidBoardItem = (item) => {
  const idValid = typeof item.id === 'string';
  const keyValid = typeof item.gridKey === 'string';
  const leftValid = !Number.isNaN(item.left);
  const topValid = !Number.isNaN(item.top);

  return idValid && keyValid && leftValid && topValid;
};
