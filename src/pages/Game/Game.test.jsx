import React from 'react';
import Game from './Game';
import { generateList } from './utils/itemsGenerator';
import { GAME_TIME_IN_SECONDS } from './gameSettings';
import { ITEM_TYPES, ITEM_ACTIONS } from './constants';

jest.useFakeTimers();

const defaultProps = {};

const setup = (props = {}) => {
  const actions = {};
  const component = <Game {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

const getLetterList = () => {
  return generateList([
    {
      name: 'a',
      points: 15,
    },
    {
      name: 'b',
      points: 10,
      bonus: {
        points: 70,
        multiples: 2,
      },
    },
    {
      name: 'c',
      points: 20,
      bonus: {
        points: 100,
        multiples: 3,
      },
    },
  ]);
};

describe('Game', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toEqual(true);
  });

  describe('Collecting letters', () => {
    it('should add proper letter object to collectedItems', () => {
      const { shallowComponent: shallow } = setup();
      shallow.instance().letterList = getLetterList();

      const collectedItemsBefore = shallow.state().collectedItems;
      shallow.instance().collectItem('a');
      const collectedItemsAfter = shallow.state().collectedItems;
      const addedItem = collectedItemsAfter[0];

      expect(collectedItemsBefore.length).toEqual(0);
      expect(collectedItemsAfter.length).toEqual(1);

      expect(addedItem.name).toEqual('a');
      expect(addedItem.quantity).toEqual(1);
      expect(addedItem.basePoints).toEqual(15);
      expect(addedItem.bonusPoints).toEqual(0);
    });

    it('should collect proper amount of items', () => {
      const { shallowComponent: shallow } = setup();
      shallow.instance().letterList = getLetterList();

      shallow.instance().collectItem('a');
      shallow.instance().collectItem('a');
      shallow.instance().collectItem('a');
      shallow.instance().collectItem('b');
      shallow.instance().collectItem('b');
      shallow.instance().collectItem('c');
      const collectedItems = shallow.state().collectedItems;

      const letterA = collectedItems.find(letter => letter.name === 'a');
      const letterB = collectedItems.find(letter => letter.name === 'b');
      const letterC = collectedItems.find(letter => letter.name === 'c');

      expect(collectedItems.length).toEqual(3);
      expect(letterA.quantity).toEqual(3);
      expect(letterB.quantity).toEqual(2);
      expect(letterC.quantity).toEqual(1);
    });

    it('should add bonus points', () => {
      const { shallowComponent: shallow } = setup();
      shallow.instance().letterList = getLetterList();

      shallow.instance().collectItem('a');
      shallow.instance().collectItem('a');
      shallow.instance().collectItem('a');

      shallow.instance().collectItem('b');
      shallow.instance().collectItem('b');
      shallow.instance().collectItem('b');
      shallow.instance().collectItem('b');
      shallow.instance().collectItem('b');

      shallow.instance().collectItem('c');
      shallow.instance().collectItem('c');
      shallow.instance().collectItem('c');

      const collectedItems = shallow.state().collectedItems;
      const letterA = collectedItems.find(letter => letter.name === 'a');
      const letterB = collectedItems.find(letter => letter.name === 'b');
      const letterC = collectedItems.find(letter => letter.name === 'c');

      expect(letterA.bonusPoints).toEqual(0);
      expect(letterB.bonusPoints).toEqual(100);
      expect(letterC.bonusPoints).toEqual(40);
    });
  });

  describe('Time and reset', () => {
    it('should reset collectedItems after call startNewGame', () => {
      const { shallowComponent: shallow } = setup();
      shallow.instance().letterList = getLetterList();

      shallow.instance().collectItem('a');
      shallow.instance().collectItem('b');
      shallow.instance().collectItem('c');
      const collectedItems = shallow.state().collectedItems;
      const newGame = shallow.state().newGame;

      shallow.instance().startNewGame();

      const collectedItemsAfter = shallow.state().collectedItems;
      const newGameAfter = shallow.state().newGame;

      expect(collectedItems.length).toBeGreaterThan(0);
      expect(collectedItemsAfter.length).toEqual(0);

      expect(newGame).toEqual(false);
      expect(newGameAfter).toEqual(false);
    });

    it('should init component with proper time', () => {
      const { shallowComponent: shallow } = setup();
      const leftTime = shallow.state().leftTime;

      expect(leftTime).toBeGreaterThanOrEqual(GAME_TIME_IN_SECONDS - 1);
      expect(leftTime).toBeLessThanOrEqual(GAME_TIME_IN_SECONDS + 1);
    });

    it('should add time bonus', () => {
      const { shallowComponent: shallow } = setup();
      const type = ITEM_TYPES.timeBonus;

      const endOfGameTime = shallow.state().endOfGameTime;
      shallow.instance().addTimeBonus(ITEM_TYPES[type]);
      const endOfGameTimeAfter = shallow.state().endOfGameTime;
      const difference = (endOfGameTimeAfter - endOfGameTime) / 1000;
      const timeBonus = ITEM_ACTIONS[type].timeBonus;

      expect(difference).toEqual(timeBonus);
    });

    it('should add time penalty', () => {
      const { shallowComponent: shallow } = setup();
      const type = ITEM_TYPES.timePenalty;

      const endOfGameTime = shallow.state().endOfGameTime;
      shallow.instance().addTimeBonus(ITEM_TYPES[type]);
      const endOfGameTimeAfter = shallow.state().endOfGameTime;
      const difference = (endOfGameTimeAfter - endOfGameTime) / 1000;
      const timeBonus = ITEM_ACTIONS[type].timeBonus;

      expect(difference).toEqual(timeBonus);
    });
  });
});
