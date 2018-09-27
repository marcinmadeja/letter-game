import timeBonusSrc from 'images/time-bonus.svg';
import timePenaltySrc from 'images/time-penalty.svg';
import { ITEM_TYPES } from '../constants';
import { TIME_BONUS_AMOUNT, TIME_PENALTY_AMOUNT, NUMBERS_AMOUNT } from '../gameSettings';

const generateAlphabet = () => [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
const generateNumbers = () => [...Array(NUMBERS_AMOUNT).keys()].map(number => String(number));

const BASE_POINTS = 10;
const ALPHABET = generateAlphabet();
const NUMBERS = generateNumbers();

export const generateList = (settings) => {
  const letters = generateLettersItem(settings);
  const numbers = generateNumbersItem();
  const timeBonuses = generateTimeBonuses(TIME_BONUS_AMOUNT);
  const timePenalty = generateTimePenalty(TIME_PENALTY_AMOUNT);

  return [
    ...letters,
    ...numbers,
    ...timeBonuses,
    ...timePenalty,
  ];
};

export const generateLettersItem = (settings) => {
  return ALPHABET
    .map(baseLetterFormat)
    .map(addCustomSettings(settings))
    .filter(removeExcluded);
};

const baseLetterFormat = letter => ({ name: letter, points: BASE_POINTS, type: ITEM_TYPES.letter });

const addCustomSettings = options => letter => {
  const letterCustom = options.find(findCustomOptions(letter.name)) || {};

  return {
    ...letter,
    ...letterCustom,
  };
};

const findCustomOptions = letterName => item => item.name === letterName;

const removeExcluded = item => !item.excluded;

export const generateNumbersItem = () => {
  return NUMBERS.map(baseNumberFormat);
};

const baseNumberFormat = number => ({ name: number, type: ITEM_TYPES.number });

export const generateTimeBonuses = (number) => {
  return [...Array(number).keys()]
    .map(timeBonusFormat);
};

const timeBonusFormat = () => ({ name: 'bonus', imageSrc: timeBonusSrc, type: ITEM_TYPES.timeBonus });

export const generateTimePenalty = (number) => {
  return [...Array(number).keys()]
    .map(timePenaltyFormat);
};

const timePenaltyFormat = () => ({ name: 'penalty', imageSrc: timePenaltySrc, type: ITEM_TYPES.timePenalty });
