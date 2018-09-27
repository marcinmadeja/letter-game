import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BASE_WIDTH, GUTTER, SHADOWS } from 'constants/styles';

const StyledPageContent = styled.div`
  width: ${BASE_WIDTH}px;
  max-width: 80%;
  height: 50vh;
  background: #fff;
  padding: ${GUTTER}px;
  box-shadow: ${SHADOWS[18]};
`;

const PageContent = ({ children }) => {
  return (
    <StyledPageContent>
      {children}
    </StyledPageContent>
  );
};

PageContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PageContent;
