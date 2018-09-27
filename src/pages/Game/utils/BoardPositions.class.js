import { get } from 'lodash';
import { randomItemFromArray } from './utils';

const ITEM_SIZE_MARGIN = 1.35;

class BoardPositions {
  constructor() {
    this.boardElement = null;
    this.boardWidth = null;
    this.boardHeight = null;
    this.itemSize = null;
    this.itemSizeMargin = true;
    this.gridOptions = {
      size: null,
      GridX: null,
      GridY: null,
    };
    this.positionsStatus = null;

    this.filterFreePosition = this.filterFreePosition.bind(this);
  }

  setNoItemMargin() {
    this.itemSizeMargin = false;
  }

  setBoardElement(boardRef) {
    this.boardElement = get(boardRef, 'current', null);
    if (!this.boardElement) this.boardElement = { offsetWidth: 0, offsetHeight: 0 };
  }

  setItemSize(itemSize) {
    const sizeMargin = this.itemSizeMargin ? ITEM_SIZE_MARGIN : 1;

    this.itemSize = itemSize;
    this.itemSizeWithMargin = itemSize * sizeMargin;
  }

  generateGrid() {
    this.setDimension();
    this.setGridItemSize();
    this.setGridPositionsStatus();
  }

  setDimension() {
    this.boardWidth = this.boardElement.offsetWidth;
    this.boardHeight = this.boardElement.offsetHeight;
  }

  setGridItemSize() {
    const GridX = Math.floor(this.boardWidth / this.itemSizeWithMargin);
    const gridSize = Math.floor(this.boardWidth / GridX);
    const GridY = Math.floor(this.boardHeight / gridSize);

    this.gridOptions = {
      size: gridSize,
      GridX,
      GridY,
    };
  }

  setGridPositionsStatus() {
    const positionsStatus = {};
    const dimensionX = this.gridOptions.GridX;
    const dimensionY = this.gridOptions.GridY;

    const translation = this.calculateTranslation();

    for (let x = 0; x < dimensionX; x++) {
      for (let y = 0; y < dimensionY; y++) {
        const position = {
          free: true,
          key: `${x}${y}`,
          x: this.calculatePosition(x, translation),
          y: this.calculatePosition(y, translation),
        };
        positionsStatus[`${x}${y}`] = position;
      }
    }

    this.positionsStatus = positionsStatus;
  }

  calculateTranslation() {
    const gridSize = this.gridOptions.size;
    const itemSize = this.itemSize;
    return Math.floor((gridSize - itemSize) / 2);
  }

  calculatePosition(index, translation) {
    const gridSize = this.gridOptions.size;
    return (index * gridSize) + translation;
  }

  getBoardPositionsStatus() {
    return this.positionsStatus;
  }

  drawFreePosition() {
    const randomPosition = this.getFreePosition();
    this.setOccupiedPosition(randomPosition);
    return randomPosition;
  }

  getFreePosition() {
    const freePositions = this.getFreePositions();
    const randomFreePosition = randomItemFromArray(freePositions);
    const randomPosition = randomItemFromArray(Object.values(this.positionsStatus));

    return randomFreePosition || randomPosition;
  }

  setOccupiedPosition(position) {
    this.updatePosition(position, { free: false });
  }

  getFreePositions() {
    const coordinates = Object.keys(this.positionsStatus);
    const freePositions = [];
    for (const position of coordinates) {
      const status = this.positionsStatus[position];
      if (status.free) freePositions.push(status);
    }

    return freePositions;
  }

  filterFreePosition(key) {
    return this.positionsStatus[key].status;
  }

  setPositionsStatus(updatedPositionsStatus) {
    this.positionsStatus = updatedPositionsStatus;
  }

  setFreePosition(key) {
    const position = this.positionsStatus[key];
    this.updatePosition(position, { free: true });
  }

  updatePosition(position, options) {
    const updatedPosition = { ...position, ...options };
    const updatedPositionsStatus = {
      ...this.positionsStatus,
      [updatedPosition.key]: updatedPosition,
    };
    this.setPositionsStatus(updatedPositionsStatus);
  }
}

export default BoardPositions;
