import React from 'react';
import HomePage from './HomePage';

const defaultProps = {};

const setup = (props = {}) => {
  const actions = {};
  const component = <HomePage {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('HomePage', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
