export const ITEM_TYPES = {
  letter: 'letter',
  number: 'number',
  timeBonus: 'timeBonus',
  timePenalty: 'timePenalty',
};

export const ITEM_ACTIONS = {
  [ITEM_TYPES.letter]: {
    timeBonus: 0.8,
    points: true,
  },
  [ITEM_TYPES.number]: {
    timeBonus: -2,
  },
  [ITEM_TYPES.timeBonus]: {
    timeBonus: 4,
  },
  [ITEM_TYPES.timePenalty]: {
    timeBonus: -5,
  },
};
