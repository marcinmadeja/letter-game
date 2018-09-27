import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { COLORS, TEXT_SHADOW } from 'constants/styles';

const StyledPointBlock = styled.div`
  height: 50px;
  display: flex;
  align-items: center;

  padding: 0 15px;
  ${props => props.backgroundColor && css`
    background: ${props.backgroundColor};
  `}

  color: #fff;
  font-size: 23px;
  font-weight: 700;
  text-shadow: ${TEXT_SHADOW.standard};
`;

const Points = styled.div`
  margin-left: auto
  font-size: 40px;
`;

const PointBlock = ({
  label,
  points,
  backgroundColor,
}) => {
  return (
    <StyledPointBlock backgroundColor={backgroundColor}>
      {label}
      <Points data-testid="points">{points}</Points>
    </StyledPointBlock>
  );
};

PointBlock.propTypes = {
  label: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
};

PointBlock.defaultProps = {
  backgroundColor: COLORS.green,
};

export default PointBlock;
