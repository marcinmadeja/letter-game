import styled, { css } from 'styled-components';
import { SHADOWS, TEXT_SHADOW, RESET_BUTTON, COLORS } from 'constants/styles';

export const StyledButton = styled.button`
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
