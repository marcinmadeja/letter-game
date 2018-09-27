import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SHADOWS } from 'constants/styles';

const StyledPointsColumn = styled.div`
  max-width: 350px;
  width: 100%;
  box-shadow: ${SHADOWS[4]};
`;

const PointsColumn = ({ children }) => {
  return (
    <StyledPointsColumn>
      {children}
    </StyledPointsColumn>
  );
};

PointsColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PointsColumn;
