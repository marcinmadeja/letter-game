import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { SHADOWS, TEXT_SHADOW, RESET_BUTTON, COLORS } from 'constants/styles';

const StyledButton = styled.button`
  ${RESET_BUTTON}
  min-width: 64px;
  min-height: 36px;
  padding: 8px 16px;
  box-sizing: border-box;

  font-size: 14px;
  line-height: 1.4;
  font-weight: 600;
  text-transform: uppercase;

  border-radius: 4px;
  transition: 0.25s all;
  box-shadow: ${SHADOWS[3]};

  &:hover {
    box-shadow: ${SHADOWS[6]};
  }

  ${props => props.size === 'big' && css`
    font-size: 20px;
    padding: 11px 20px;
  `}

  ${props => props.variant === 'hero' && css`
    background: ${COLORS.blue};
    color: #fff;
    text-shadow: ${TEXT_SHADOW.standard};
  `}
`;

const Button = ({
  children,
  variant,
  size,
  SpecialElement,
  ...rest
}) => {
  const AdditionalElement = SpecialElement || null;

  return (
    <StyledButton
      {...rest}
      type="button"
      variant={variant}
      size={size}
    >
      {children}
      {AdditionalElement}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  size: PropTypes.string,
  variant: PropTypes.string,
  SpecialElement: PropTypes.oneOfType([
    PropTypes.node,
  ]),
};

Button.defaultProps = {
  size: 'standard',
  variant: 'standard',
  SpecialElement: null,
};

export default Button;
