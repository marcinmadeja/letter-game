import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TEXT_SHADOW, COLORS } from 'constants/styles';

const StyledGameTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  text-transform: uppercase;
  font-weight: 900;
  background: ${COLORS.darkBlue};
  color: #fff;
  text-shadow: ${TEXT_SHADOW.standard};
`;

const GameTitle = ({ children }) => {
  return (
    <StyledGameTitle>
      {children}
    </StyledGameTitle>
  );
};

GameTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default GameTitle;
