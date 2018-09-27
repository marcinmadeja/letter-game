export const LETTER_OPTIONS = [
  {
    name: 'a',
    points: 50,
    bonus: {
      points: 200,
      multiples: 3,
    },
  },
  {
    name: 'b',
    points: 30,
    bonus: {
      points: 90,
      multiples: 2,
    },
  },
  {
    name: 'd',
    bonus: {
      points: 110,
      multiples: 5,
    },
  },
  {
    name: 'c',
    points: 15,
  },
  {
    name: 'g',
    points: 25,
    bonus: {
      points: 150,
      multiples: 4,
    },
  },
  {
    name: 'y',
    excluded: true,
  },
];

export const GAME_TIME_IN_SECONDS = 30;
export const TIME_BONUS_AMOUNT = 3;
export const TIME_PENALTY_AMOUNT = 3;
export const NUMBERS_AMOUNT = 8;
export const ITEM_SIZE = 85;
export const ITEM_APPEAR_TIME_MIN = 0.3;
export const ITEM_APPEAR_TIME_MAX = 1.2;
export const GAME_TIME = (GAME_TIME_IN_SECONDS + 1) * 1000;
export const BOARD_MAX_ITEM_NUMBER = 12;
export const ITEM_FADE_DELAY = 1.5 * 1000;
export const ITEM_FADE_DURATION = 0.5 * 1000;
