import React from 'react';
import BoardColumn from './BoardColumn';

const defaultProps = {
  children: <span />,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <BoardColumn {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('BoardColumn', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
