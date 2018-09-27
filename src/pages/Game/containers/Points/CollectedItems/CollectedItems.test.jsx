import React from 'react';
import CollectedItems from './CollectedItems';
import PointItem from './PointItem';
import { collectedItems } from '../../../testUtils/constants';

const defaultProps = {
  collectedItems: [],
};

const setup = (props = {}) => {
  const actions = {};
  const component = <CollectedItems {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('CollectedItems', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should render all collected items', () => {
    const { shallowComponent } = setup({
      collectedItems,
    });

    expect(shallowComponent.find(PointItem).length).toBe(collectedItems.length);
  });
});
