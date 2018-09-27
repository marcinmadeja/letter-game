import React from 'react';
import HighScore from './HighScore';

const defaultProps = {};

const setup = (props = {}) => {
  const actions = {};
  const component = <HighScore {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('HighScore', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
