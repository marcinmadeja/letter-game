import React from 'react';
import { get } from 'lodash';
import CountdownTimer from 'components/CountdownTimer/CountdownTimer';

import { generateList } from './utils/itemsGenerator';
import { LETTER_OPTIONS, GAME_TIME, ITEM_SIZE } from './gameSettings';
import { ITEM_ACTIONS } from './constants';
import { sortByName, calculateTotalScore } from './utils/utils';
import BoardPositions from './utils/BoardPositions.class';

import Points from './containers/Points/Points';
import GameBoard from './containers/GameBoard/GameBoard';

import GameView from './components/GameView/GameView';
import GameTitle from './components/GameTitle/GameTitle';
import BoardColumn from './components/BoardColumn/BoardColumn';
import PointsColumn from './components/PointsColumn/PointsColumn';
import ColumnHeader from './components/ColumnHeader/ColumnHeader';
import GameSummary from './components/GameSummary/GameSummary';

const replaceItem = (itemToReplace, items) => {
  return [
    ...items.filter(excludeItem(itemToReplace)),
    itemToReplace,
  ];
};

const excludeItem = excludedItem => item => item.name !== excludedItem.name;

const emptyItemState = name => ({ name, quantity: 0, basePoints: 0, bonusPoints: 0, collection: 0 });
const findItemByName = name => item => item.name === name;
const updateCollectedItem = item => state => {
  const collectedItems = replaceItem(item, state.collectedItems).sort(sortByName);
  return { collectedItems };
};

const changeLeftTime = leftTime => () => ({ leftTime: Math.max(leftTime, 0) });
const getEndOfGameTime = () => {
  return new Date().getTime() + GAME_TIME;
};

const updateEndTime = updateByTime => state => {
  const endOfGameTime = state.endOfGameTime + updateByTime;
  return { endOfGameTime };
};

const getItemState = (name, collectedItems) => {
  return collectedItems.find(findItemByName(name)) || emptyItemState(name);
};

export const updateItem = (itemState, letterList) => {
  const itemDetails = letterList.find(findItemByName(itemState.name));
  const points = itemDetails.points;
  const updatedItem = { ...itemState };

  updatedItem.quantity += 1;
  updatedItem.basePoints += points;
  updatedItem.bonusPoints += addBonusPoints(updatedItem.quantity, updatedItem.bonusPoints, itemDetails);

  return updatedItem;
};

export const addBonusPoints = (quantity, currentBonusPoints, itemDetails) => {
  const {
    points: basePoint,
    bonus = {},
  } = itemDetails;
  const pointsWithBonus = bonus.points;
  const multiples = bonus.multiples;

  if (!pointsWithBonus || !multiples) return 0;
  if (quantity % multiples !== 0) return 0;

  const pointsWithoutBonus = multiples * basePoint;
  const bonusPoints = pointsWithBonus - pointsWithoutBonus;

  return bonusPoints;
};

const initialState = {
  collectedItems: [],
  leftTime: null,
  endOfGameTime: getEndOfGameTime(),
  newGame: false,
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.letterList = generateList(LETTER_OPTIONS);
    this.countdownInterval = null;
    this.boardRef = React.createRef();
    this.BoardPositions = new BoardPositions();
    this.state = {
      ...initialState,
      gridCalculated: false,
    };

    this.collectItem = this.collectItem.bind(this);
    this.intervalCallback = this.intervalCallback.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.addTimeBonus = this.addTimeBonus.bind(this);
  }

  componentDidMount() {
    this.setCountdownTimer();
    this.initBoardPositions();
  }

  initBoardPositions() {
    this.BoardPositions.setBoardElement(this.boardRef);
    this.BoardPositions.setItemSize(ITEM_SIZE);
    this.BoardPositions.generateGrid();
    this.setState({ gridCalculated: true });
  }

  componentDidUpdate(prevProps, prevState) {
    this.endGameWhenTimeEnd(prevState);
  }

  componentWillUnmount() {
    this.clearCountdownInterval();
  }

  endGameWhenTimeEnd(prevState) {
    if (!this.didGameEndedNow(prevState)) return false;
    this.clearCountdownInterval();
  }

  didGameEndedNow(prevState) {
    const prevLeftTime = prevState.leftTime;
    const leftTime = this.state.leftTime;

    return leftTime === 0 && prevLeftTime > 0;
  }

  setCountdownTimer() {
    this.setState({ endOfGameTime: getEndOfGameTime() }, this.initCountdownInterval);
  }

  initCountdownInterval() {
    this.intervalCallback();
    this.setCountdownInterval();
  }

  setCountdownInterval() {
    this.clearCountdownInterval();
    this.countdownInterval = setInterval(this.intervalCallback, 1000);
  }

  clearCountdownInterval() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  intervalCallback() {
    const { endOfGameTime } = this.state;
    const now = new Date().getTime();
    const distance = endOfGameTime - now;
    const leftTime = Math.floor(distance / 1000);

    this.setState(changeLeftTime(leftTime));
  }

  addTimeModificator(timeModificator) {
    this.setState(updateEndTime(timeModificator));
  }

  collectItem(name) {
    const { collectedItems } = this.state;
    const itemState = getItemState(name, collectedItems);
    const updatedItemState = updateItem(itemState, this.letterList);

    this.setState(updateCollectedItem(updatedItemState), this.intervalCallback);
  }

  addTimeBonus(type) {
    const timeModificator = this.getTimeModificator(type);
    this.addTimeModificator(timeModificator);
  }

  getTimeModificator(type) {
    const timeModificator = get(ITEM_ACTIONS, `[${type}].timeBonus`, 0);
    return timeModificator * 1000;
  }

  getEndOfGameStatus(leftTime) {
    if (leftTime === null) return false;
    return !leftTime;
  }

  startNewGame() {
    this.setState({ newGame: true }, this.resetGameOptions);
  }

  resetGameOptions() {
    this.setState({ ...initialState }, () => {
      this.clearCountdownInterval();
      this.setCountdownTimer();
    });
  }

  render() {
    const { collectedItems, leftTime, newGame, gridCalculated } = this.state;
    const isGameFinished = this.getEndOfGameStatus(leftTime);
    const score = calculateTotalScore(collectedItems);

    return (
      <GameView>
        <BoardColumn>
          <ColumnHeader>
            <GameTitle>
              Letter game! Points
            </GameTitle>
          </ColumnHeader>

          {!isGameFinished && (
            <GameBoard
              boardRef={this.boardRef}
              allItems={this.letterList}
              collectItem={this.collectItem}
              collectedItems={collectedItems}
              isGameFinished={isGameFinished}
              newGame={newGame}
              gridCalculated={gridCalculated}
              BoardPositions={this.BoardPositions}
              addTimeBonus={this.addTimeBonus}
            />
          )}

          {isGameFinished && <GameSummary score={score} />}
        </BoardColumn>

        <PointsColumn>
          <ColumnHeader>
            <CountdownTimer leftTime={leftTime} label="Left time" />
          </ColumnHeader>

          <Points
            collectedItems={collectedItems}
            startNewGame={this.startNewGame}
          />
        </PointsColumn>
      </GameView>
    );
  }
}

export default Game;
