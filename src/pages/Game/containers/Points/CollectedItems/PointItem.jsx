import React from 'react';
import PropTypes from 'prop-types';

export const displayPoints = (base, bonus) => base + bonus;

const PointItem = ({
  name,
  quantity,
  basePoints,
  bonusPoints,
}) => {
  return (
    <tr>
      <td data-testid="name">{name}</td>
      <td data-testid="quantity">{quantity}</td>
      <td data-testid="points">{displayPoints(basePoints, bonusPoints)}</td>
    </tr>
  );
};

PointItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  basePoints: PropTypes.number.isRequired,
  bonusPoints: PropTypes.number.isRequired,
};

export default PointItem;
