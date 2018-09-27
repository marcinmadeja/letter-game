import React from 'react';
import MainContent from './MainContent';

const defaultProps = {
  children: <span />,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <MainContent {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('MainContent', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
