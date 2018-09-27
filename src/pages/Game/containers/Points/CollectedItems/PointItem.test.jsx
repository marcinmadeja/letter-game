import React from 'react';
import PointItem, { displayPoints } from './PointItem';
import { collectedItems } from '../../../testUtils/constants';

const item = collectedItems[0];
const defaultProps = { ...item };

const setup = (props = {}) => {
  const actions = {};
  const component = <PointItem {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('PointItem', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should render all item details', () => {
    const { shallowComponent } = setup({
      name: 'test name',
      quantity: 9998,
    });
    expect(shallowComponent.contains('test name')).toBe(true);
    expect(shallowComponent.contains(9998)).toBe(true);
  });

  it('should render proper points without bonus', () => {
    const basePoints = 12345;
    const { shallowComponent } = setup({
      basePoints,
      bonusPoints: 0,
    });

    const calculatedPoints = displayPoints(basePoints, 0);
    expect(shallowComponent.contains(calculatedPoints)).toEqual(true);
  });

  it('should render proper points with bonus', () => {
    const basePoints = 12345;
    const bonusPoints = 6789;
    const { shallowComponent } = setup({
      basePoints,
      bonusPoints,
    });

    const calculatedPoints = displayPoints(basePoints, bonusPoints);
    expect(shallowComponent.contains(calculatedPoints)).toEqual(true);
  });
});
