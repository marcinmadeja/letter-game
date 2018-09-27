import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { MAIN_COLORS, TEXT_SHADOW, SHADOWS } from 'constants/styles';
import { ITEM_FADE_DURATION, ITEM_SIZE } from '../../gameSettings';

const fadeOutAnimationTime = (ITEM_FADE_DURATION / 1000) * 1.3;

const appearAnimation = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOutAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0);
    opacity: 0;
  }
`;

export const StyledItem = styled.button`
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  background: ${MAIN_COLORS.green};
  box-shadow: ${SHADOWS[3]};
  outline: none;
  border: none;
  position: absolute;

  cursor: pointer;
  user-select: none;
  transition: 0.25s all;

  color: #fff;
  text-shadow: ${TEXT_SHADOW.standard};
  text-transform: uppercase;
  font-size: 43px;
  font-weight: 900;

  animation: ${appearAnimation} 0.25s ease-out;

  &:hover {
    box-shadow: ${SHADOWS[6]};
  }

  ${props => (props.top || props.top === 0) && css`
    top: ${props.top}px;
  `}

  ${props => (props.left || props.left === 0) && css`
    left: ${props.left}px;
  `}

  ${props => props.background && css`
    background: ${props.background};
  `}

  ${props => props.isFading && css`
    animation: ${fadeOutAnimation} ${fadeOutAnimationTime}s ease-out;
  `}
`;

const Icon = styled.img`
  width: 80%;
  max-height: 80%;
`;

export const displayLabel = (name, imageSrc) => {
  if (imageSrc) return <Icon src={imageSrc} />;
  return name;
};

const Item = ({
  type,
  name,
  id,
  imageSrc,
  onClick,
  backgroundColor,
  isFading,
  gridKey,
  top,
  left,
}) => {
  return (
    <StyledItem
      data-name={name}
      data-type={type}
      data-id={id}
      data-grid-key={gridKey}
      onClick={onClick}
      background={backgroundColor}
      isFading={isFading}
      top={top}
      left={left}
    >
      {displayLabel(name, imageSrc)}
    </StyledItem>
  );
};

Item.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  id: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isFading: PropTypes.bool,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  gridKey: PropTypes.string.isRequired,
};

Item.defaultProps = {
  isFading: false,
  imageSrc: null,
};

export default Item;
