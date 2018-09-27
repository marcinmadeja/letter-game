import React from 'react';
import BoardItem from './BoardItem';

jest.useFakeTimers();

const defaultProps = {
  id: '1234',
  gridKey: '20',
  removeItemById: () => {},
  View: () => null,
};

const setup = (props = {}) => {
  const actions = {
    removeItemById: jest.fn(),
  };
  const component = <BoardItem {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('BoardItem', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should call initFadeProcess after mount', () => {
    const spy = jest.spyOn(BoardItem.prototype, 'initFadeProcess');
    setup();
    expect(spy).toHaveBeenCalled();
  });

  it('should call startFading, removeItemSpy and removeItemById after', () => {
    const startFadingSpy = jest.spyOn(BoardItem.prototype, 'startFading');
    const removeItemSpy = jest.spyOn(BoardItem.prototype, 'removeItem');
    const { actions } = setup();

    jest.runAllTimers();
    expect(startFadingSpy).toBeCalled();
    expect(removeItemSpy).toBeCalled();
    expect(actions.removeItemById).toBeCalled();
  });

  it('should change isFading to true after runAllTimers', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.state().isFading).toEqual(false);

    jest.runAllTimers();

    expect(shallowComponent.state().isFading).toEqual(true);
  });
});
