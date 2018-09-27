export const randomItemFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomProperty = object => {
  const array = Object.values(object) || [];
  return randomItemFromArray(array);
};

export const randomChart4 = () => {
  return Math.random().toString(16).slice(-4);
};

export const uniqueId = () => {
  return `${randomChart4()}${randomChart4()}${randomChart4()}${randomChart4()}`;
};

export const randomIntervalBetween = (start, end) => {
  const minMs = start * 1000;
  const maxMS = end * 1000;

  return Math.floor(Math.random() * maxMS) + minMs;
};

export const sortByName = (a, b) => (a.name >= b.name ? 1 : -1);

export const calculateBonus = items => {
  return items
    .map(item => item.bonusPoints)
    .reduce((total, next) => total + next, 0);
};

export const calculateTotalScore = items => {
  return items
    .map(item => (item.bonusPoints + item.basePoints))
    .reduce((total, next) => total + next, 0);
};
