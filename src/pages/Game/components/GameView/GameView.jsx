import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BASE_WIDTH, SHADOWS } from 'constants/styles';

export const StyledGameView = styled.div`
  width: ${BASE_WIDTH}px;
  max-width: 95%;
  height: 80vh;
  display: flex;
  background: #fff;
  box-shadow: ${SHADOWS[18]};
  overflow: hidden;
`;

const GameView = ({ children }) => {
  return (
    <StyledGameView>
      {children}
    </StyledGameView>
  );
};

GameView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default GameView;
