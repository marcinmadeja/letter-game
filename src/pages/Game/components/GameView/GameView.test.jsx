import React from 'react';
import GameView from './GameView';

const defaultProps = {
  children: <span />,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <GameView {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('GameView', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
