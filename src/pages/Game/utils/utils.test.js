import * as utils from './utils';

describe('Utils', () => {
  describe('randomIntervalBetween', () => {
    it('should generate random number between two', () => {
      const start = 1;
      const end = 1.1;
      const number = utils.randomIntervalBetween(start, end);
      const min = start * 1000;
      const max = end * 1000 + min;
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
    });
  });

  describe('calculateBonus', () => {
    it('should calculate bonus points', () => {
      const items = [
        { bonusPoints: 0 },
        { bonusPoints: 0 },
        { bonusPoints: 0 },
        { bonusPoints: 0 },
      ];

      const bonusPoints = utils.calculateBonus(items);
      expect(bonusPoints).toEqual(0);
    });

    it('should calculate bonus points 2', () => {
      const items = [
        { bonusPoints: 1 },
        { bonusPoints: 2 },
        { bonusPoints: 3 },
        { bonusPoints: 0 },
      ];

      const bonusPoints = utils.calculateBonus(items);
      expect(bonusPoints).toEqual(6);
    });
  });
});
