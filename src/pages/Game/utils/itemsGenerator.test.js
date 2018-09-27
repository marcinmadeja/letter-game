import * as itemsGenerator from './itemsGenerator';
import { isValidLetterItem, isValidNumberItem, isValidTimeBonus, isValidTimePenalty } from '../testUtils/testUtils';
import { NUMBERS_AMOUNT } from '../gameSettings';

describe('itemsGenerator', () => {
  describe('generateLettersItem', () => {
    it('should generate all valid items list', () => {
      const letters = itemsGenerator.generateLettersItem([]);
      let isValid = true;

      for (const letter of letters) {
        if (!isValidLetterItem(letter)) {
          isValid = false;
          break;
        }
      }

      expect(isValid).toBe(true);
    });

    it('should detect invalid element', () => {
      const letters = itemsGenerator.generateLettersItem([]);
      let isValid = true;

      letters.push({ name: 'b', points: 10, type: 'wrongType' });

      for (const letter of letters) {
        if (!isValidLetterItem(letter)) {
          isValid = false;
          break;
        }
      }

      expect(isValid).toBe(false);
    });

    it('should exclude letters', () => {
      const lettersAmount = itemsGenerator.generateLettersItem([]).length;
      const excludedLettersAmount = itemsGenerator.generateLettersItem([
        { name: 'a', excluded: true },
        { name: 'b', excluded: true },
        { name: 'c', excluded: true },
      ]).length;

      expect(excludedLettersAmount).toEqual(lettersAmount - 3);
    });

    it('should modify letter by passed settings', () => {
      const letters = itemsGenerator.generateLettersItem([{
        name: 'f',
        points: 100,
        bonus: {
          points: 200,
          multiples: 3,
        },
      }]);

      const modifiedLetter = letters.find(item => item.name === 'f');
      expect(modifiedLetter.points).toEqual(100);
      expect(modifiedLetter.bonus).toEqual({ points: 200, multiples: 3 });
    });
  });

  describe('generateNumbersItem', () => {
    it('should generate proper number of numbers item', () => {
      const numbersAmount = itemsGenerator.generateNumbersItem().length;
      expect(numbersAmount).toEqual(NUMBERS_AMOUNT);
    });

    it('should generate all valid number list', () => {
      const numbers = itemsGenerator.generateNumbersItem();
      let isValid = true;

      for (const number of numbers) {
        if (!isValidNumberItem(number)) {
          isValid = false;
          break;
        }
      }

      expect(isValid).toBe(true);
    });
  });

  describe('generateTimeBonuses', () => {
    it('should generate all valid time bonuses list', () => {
      const timeBonuses = itemsGenerator.generateTimeBonuses();
      let isValid = true;

      for (const bonus of timeBonuses) {
        if (!isValidTimeBonus(bonus)) {
          isValid = false;
          break;
        }
      }

      expect(isValid).toBe(true);
    });
  });

  describe('generateTimePenalty', () => {
    it('should generate all valid time penalty list', () => {
      const timePenalty = itemsGenerator.generateTimePenalty();
      let isValid = true;

      for (const penalty of timePenalty) {
        if (!isValidTimePenalty(penalty)) {
          isValid = false;
          break;
        }
      }

      expect(isValid).toBe(true);
    });
  });
});
