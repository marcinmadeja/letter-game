import React from 'react';
import GameBoard from './GameBoard';
import BoardPositions from '../../utils/BoardPositions.class';
import { isValidBoardItem } from '../../testUtils/testUtils';

jest.useFakeTimers();

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

const defaultProps = {
  isGameFinished: false,
  newGame: false,
  allItems: [],
  collectItem: () => {},
  addTimeBonus: () => {},
  boardRef: {},
  BoardPositions: getBoard(),
};

const setup = (props = {}) => {
  const actions = {};
  const component = <GameBoard {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('GameBoard', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should call startItemsGeneration after mount', () => {
    const spy = jest.spyOn(GameBoard.prototype, 'startItemsGeneration');
    setup();
    expect(spy).toHaveBeenCalled();
  });

  it('should generateItemActions, addItemToDashboard, startItemsGeneration after ITEM_APPEAR_TIME_MAX',
    () => {
      const generateItemActionsSpy = jest.spyOn(GameBoard.prototype, 'generateItemActions');
      const addItemToDashboardSpy = jest.spyOn(GameBoard.prototype, 'addItemToDashboard');
      const startItemsGeneration = jest.spyOn(GameBoard.prototype, 'startItemsGeneration');
      setup();

      jest.runOnlyPendingTimers();

      expect(generateItemActionsSpy).toBeCalled();
      expect(addItemToDashboardSpy).toBeCalled();
      expect(startItemsGeneration).toBeCalled();
    });

  it('should create proper boardItem after time delay', () => {
    const { shallowComponent } = setup();
    const boardItemsStart = shallowComponent.state().boardItems;

    jest.runOnlyPendingTimers();

    const boardItemsAfter = shallowComponent.state().boardItems;
    const item = boardItemsAfter[0];

    expect(boardItemsStart.length).toEqual(0);
    expect(boardItemsAfter.length).toEqual(1);
    expect(isValidBoardItem(item)).toEqual(true);
  });
});
