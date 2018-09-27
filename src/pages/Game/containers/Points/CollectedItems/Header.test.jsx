import React from 'react';
import Header from './Header';

const defaultProps = {};

const setup = (props = {}) => {
  const actions = {};
  const component = <Header {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('Header', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
