import React from 'react';
import Button from './Button';

const defaultProps = {
  children: <span />,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <Button {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('Button', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });
});
