import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledColumnHeader = styled.div`
  height: 100%;
  max-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 25px;
  font-weight: 700;
`;

const ColumnHeader = ({ children }) => {
  return (
    <StyledColumnHeader>
      {children}
    </StyledColumnHeader>
  );
};

ColumnHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ColumnHeader;
