import BoardPositions from './BoardPositions.class';

const WIDTH = 1000;
const HEIGHT = 1000;
const ITEM_SIZE = 100;

const getBoard = () => {
  const boardPositions = new BoardPositions();
  boardPositions.setNoItemMargin();
  boardPositions.setBoardElement({ current: { offsetWidth: WIDTH, offsetHeight: HEIGHT } });
  boardPositions.setItemSize(ITEM_SIZE);
  boardPositions.generateGrid();
  return boardPositions;
};

describe('BoardPositions', () => {
  describe('positionsStatus', () => {
    it('should generate proper amount of items', () => {
      const boardPositions = getBoard();
      const EXPECTED_ITEMS_NUMBER = (WIDTH * HEIGHT) / (ITEM_SIZE * ITEM_SIZE);
      const positionsAmount = Object.values(boardPositions.getBoardPositionsStatus()).length;

      expect(positionsAmount).toEqual(EXPECTED_ITEMS_NUMBER);
    });

    it('should generate all free items list', () => {
      const boardPositions = getBoard();
      const positions = Object.values(boardPositions.getBoardPositionsStatus());
      let isValid = true;

      for (const position of positions) {
        if (!position.free) {
          isValid = false;
          break;
        }
      }

      expect(isValid).toEqual(true);
    });

    it('should get free random position and set free to false', () => {
      const boardPositions = getBoard();
      const drawAmount = 5;
      const freePositionsAmount = boardPositions.getFreePositions().length;

      for (let i = 1; i <= drawAmount; i++) boardPositions.drawFreePosition();

      const freePositionsAmountAfterDrawing = boardPositions.getFreePositions().length;

      expect(freePositionsAmountAfterDrawing)
        .toEqual(freePositionsAmount - drawAmount);
    });
  });

  describe('Free positions', () => {
    it('should get proper amount of free positions', () => {
      const boardPositions = getBoard();
      boardPositions.positionsStatus = {
        '00': { free: false, key: '00', x: 0, y: 0 },
        '01': { free: false, key: '01', x: 0, y: 0 },
        '02': { free: false, key: '02', x: 0, y: 0 },
        '03': { free: false, key: '03', x: 0, y: 0 },
        '04': { free: true, key: '04', x: 0, y: 0 },
      };

      const freePositions = boardPositions.getFreePositions();
      expect(freePositions.length).toEqual(1);
    });

    it('should get no position when all are occupied', () => {
      const boardPositions = getBoard();
      boardPositions.positionsStatus = {
        '00': { free: false, key: '00', x: 0, y: 0 },
        '01': { free: false, key: '01', x: 0, y: 0 },
        '02': { free: false, key: '02', x: 0, y: 0 },
        '03': { free: false, key: '03', x: 0, y: 0 },
        '04': { free: false, key: '04', x: 0, y: 0 },
      };

      const freePositions = boardPositions.getFreePositions();
      expect(freePositions.length).toEqual(0);
    });

    it('should draw the only one free position', () => {
      const boardPositions = getBoard();
      boardPositions.positionsStatus = {
        '00': { free: false, key: '00', x: 0, y: 0 },
        '01': { free: false, key: '01', x: 0, y: 0 },
        '02': { free: false, key: '02', x: 0, y: 0 },
        '03': { free: false, key: '03', x: 0, y: 0 },
        '04': { free: true, key: '04', x: 0, y: 0 },
      };

      const freePosition = boardPositions.getFreePosition();
      expect(freePosition.key).toEqual('04');
    });
  });

  describe('Setting free position', () => {
    it('should set free position for chosen item', () => {
      const key = '01';
      const boardPositions = getBoard();
      boardPositions.positionsStatus = {
        '00': { free: false, key: '00', x: 0, y: 0 },
        '01': { free: false, key: '01', x: 0, y: 0 },
        '02': { free: false, key: '02', x: 0, y: 0 },
        '03': { free: true, key: '03', x: 0, y: 0 },
        '04': { free: true, key: '04', x: 0, y: 0 },
      };

      const positionBefore = boardPositions.positionsStatus[key];
      expect(positionBefore.free).toEqual(false);

      boardPositions.setFreePosition('01');
      const positionAfter = boardPositions.positionsStatus[key];
      expect(positionAfter.free).toEqual(true);
    });
  });
});
