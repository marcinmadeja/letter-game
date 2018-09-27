import React from 'react';
import CountdownTimer from './CountdownTimer';

const defaultProps = {
  leftTime: 0,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <CountdownTimer {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);
  const mountedComponent = mount(component);

  return {
    actions,
    component,
    shallowComponent,
    mountedComponent,
  };
};

describe('CountdownTimer', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should render default value', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.dive().text()).toEqual('0');
  });

  it('should render passed value', () => {
    const { shallowComponent } = setup({ leftTime: 99 });
    expect(shallowComponent.dive().text()).toEqual('99');
  });
});
