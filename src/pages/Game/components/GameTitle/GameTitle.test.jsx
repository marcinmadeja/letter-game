import React from 'react';
import GameTitle from './GameTitle';

const defaultProps = {
  children: <span />,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <GameTitle {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('GameTitle', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
