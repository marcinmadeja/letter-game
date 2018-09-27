import React from 'react';
import PropTypes from 'prop-types';
import BoardItem from '../BoardItem/BoardItem';
import Item from './Item';

const BoardList = ({
  boardItems,
  removeItemById,
  handleItemClick,
}) => {
  return (
    <React.Fragment>
      {boardItems.map(item => (
        <BoardItem
          key={item.id}
          id={item.id}
          name={item.name}
          imageSrc={item.imageSrc}
          type={item.type}
          onClick={handleItemClick}
          removeItemById={removeItemById}
          gridKey={item.gridKey}
          top={item.top}
          left={item.left}
          View={Item}
        />
      ))}
    </React.Fragment>
  );
};

BoardList.propTypes = {
  boardItems: PropTypes.array.isRequired,
  removeItemById: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};

export default BoardList;
