import React from 'react';
import Root from './Root';

const defaultProps = {};

const setup = (props = {}) => {
  const actions = {};
  const component = <Root {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('Root', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
