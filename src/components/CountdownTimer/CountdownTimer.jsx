import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS, TEXT_SHADOW } from 'constants/styles';

const StyledCountdownTimer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.yellow};

  color: #fff;
  letter-spacing: 3px;
  font-size: 42px;
  font-weight: 900;
  text-shadow: ${TEXT_SHADOW.standard};
  user-select: none;
`;

const CountdownTimer = ({
  leftTime,
}) => {
  return (
    <StyledCountdownTimer>
      {leftTime}
    </StyledCountdownTimer>
  );
};

CountdownTimer.propTypes = {
  leftTime: PropTypes.number,
};

CountdownTimer.defaultProps = {
  leftTime: 0,
};

export default CountdownTimer;
