import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import styled from 'styled-components';
import { GUTTER } from 'constants/styles';
import { randomItemFromArray, randomIntervalBetween, uniqueId } from '../../utils/utils';
import { ITEM_TYPES } from '../../constants';
import { ITEM_APPEAR_TIME_MIN, ITEM_APPEAR_TIME_MAX, BOARD_MAX_ITEM_NUMBER } from '../../gameSettings';
import BoardList from './BoardList';

const StyledGameBoard = styled.div`
  height: 100%;
  position: relative;
  padding: ${GUTTER}px;
`;

const addItem = newItem => state => ({ boardItems: [...state.boardItems, newItem] });
const removeItem = id => state => ({ boardItems: state.boardItems.filter(item => item.id !== id) });

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardItems: [],
    };

    this.generateItemTimeout = null;
    this.handleItemClick = this.handleItemClick.bind(this);
    this.generateItemActions = this.generateItemActions.bind(this);
    this.removeItemById = this.removeItemById.bind(this);
  }

  componentDidMount() {
    this.startItemsGeneration();
  }

  componentDidUpdate(prevProps) {
    this.resetBoardAfterNewGameStart(prevProps);
  }

  componentWillUnmount() {
    this.resetGenerationTimeout();
  }

  resetBoardAfterNewGameStart(prevProps) {
    if (!this.didNewGameStart(prevProps)) return false;
    this.setState({ boardItems: [] });
  }

  didNewGameStart(prevProps) {
    const prevNewGame = prevProps.newGame;
    const newGame = this.props.newGame;

    return prevNewGame && !newGame;
  }

  startItemsGeneration() {
    const showNextItemInterval = randomIntervalBetween(ITEM_APPEAR_TIME_MIN, ITEM_APPEAR_TIME_MAX);
    this.generateItemTimeout = setTimeout(this.generateItemActions, showNextItemInterval);
  }

  resetGenerationTimeout() {
    if (this.generateItemTimeout) clearTimeout(this.generateItemTimeout);
  }

  generateItemActions() {
    this.addItemToDashboard();
    this.startItemsGeneration();
  }

  addItemToDashboard() {
    if (!this.canAddItem()) return false;
    const { BoardPositions } = this.props;
    const freePosition = BoardPositions.drawFreePosition();
    const newItem = this.createItem(freePosition);
    this.setState(addItem(newItem));
  }

  canAddItem() {
    const { boardItems } = this.state;
    const { isGameFinished } = this.props;
    if (isGameFinished) return false;
    if (boardItems.length >= BOARD_MAX_ITEM_NUMBER) return false;
    return true;
  }

  createItem(freePosition) {
    const { allItems } = this.props;
    const drawnItem = randomItemFromArray(allItems);
    const id = uniqueId();

    return {
      ...drawnItem,
      id,
      gridKey: freePosition.key,
      left: freePosition.x,
      top: freePosition.y,
    };
  }

  handleItemClick(event) {
    const { isGameFinished, collectItem, addTimeBonus } = this.props;
    if (isGameFinished) return false;

    const name = get(event, 'currentTarget.dataset.name');
    const type = get(event, 'currentTarget.dataset.type');
    const id = get(event, 'currentTarget.dataset.id');
    const gridKey = get(event, 'currentTarget.dataset.gridKey');
    if (!name || !type || !id) return false;
    if (type === ITEM_TYPES.letter) collectItem(name, type);

    addTimeBonus(type);
    this.removeItemById(id, gridKey);
  }

  removeItemById(id, gridKey) {
    this.setState(removeItem(id), () => {
      this.props.BoardPositions.setFreePosition(gridKey);
    });
  }

  render() {
    const { boardItems } = this.state;
    const { boardRef } = this.props;

    return (
      <StyledGameBoard innerRef={boardRef}>
        <BoardList
          boardItems={boardItems}
          handleItemClick={this.handleItemClick}
          removeItemById={this.removeItemById}
        />
      </StyledGameBoard>
    );
  }
}

GameBoard.propTypes = {
  isGameFinished: PropTypes.bool.isRequired,
  newGame: PropTypes.bool.isRequired,
  allItems: PropTypes.array.isRequired,
  collectItem: PropTypes.func.isRequired,
  addTimeBonus: PropTypes.func.isRequired,
  boardRef: PropTypes.object.isRequired,
  BoardPositions: PropTypes.object.isRequired,
};

export default GameBoard;
