import React from 'react';
import BoardList from './BoardList';

const defaultProps = {
  boardItems: [],
  removeItemById: () => {},
  handleItemClick: () => {},
};

const setup = (props = {}) => {
  const actions = {};
  const component = <BoardList {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('BoardList', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
