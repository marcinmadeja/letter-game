import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from 'constants/styles';

const StyledMainContent = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.lightBlue};
`;

const MainContent = ({ children }) => {
  return (
    <StyledMainContent>
      {children}
    </StyledMainContent>
  );
};

MainContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainContent;
