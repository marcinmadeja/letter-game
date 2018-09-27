import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBoardColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BoardColumn = ({ children }) => {
  return (
    <StyledBoardColumn>
      {children}
    </StyledBoardColumn>
  );
};

BoardColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BoardColumn;
