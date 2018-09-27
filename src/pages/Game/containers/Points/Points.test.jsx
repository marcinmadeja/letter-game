import React from 'react';
import Points from './Points';
import CollectedItems from './CollectedItems/CollectedItems';

const defaultProps = {
  collectedItems: [],
  startNewGame: () => {},
};

const setup = (props = {}) => {
  const actions = { startNewGame: jest.fn() };
  const component = <Points {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('Points', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should call handleClick', () => {
    const { shallowComponent, actions } = setup();
    const button = shallowComponent.find('[data-testid="new-game-button"]');
    expect(actions.startNewGame.mock.calls.length).toEqual(0);
    button.simulate('click');
    expect(actions.startNewGame.mock.calls.length).toEqual(1);
  });

  it('should render CollectedItems component', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.find(CollectedItems).length).toBe(1);
  });

  it('should render PointBlock Bonuses component', () => {
    const { shallowComponent } = setup();
    const Bonuses = shallowComponent.find('[data-testid="bonuses"]');
    expect(Bonuses.length).toBe(1);
  });

  it('should render PointBlock Bonuses component', () => {
    const { shallowComponent } = setup();
    const Total = shallowComponent.find('[data-testid="total"]');
    expect(Total.length).toBe(1);
  });
});
