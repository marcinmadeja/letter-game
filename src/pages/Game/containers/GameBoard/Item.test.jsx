import React from 'react';
import Item, { displayLabel } from './Item';

const defaultProps = {
  type: '',
  name: '',
  imageSrc: '',
  id: '',
  backgroundColor: '',
  onClick: () => {},
  isFading: false,
  top: 0,
  left: 0,
  gridKey: '',
};

const setup = (props = {}) => {
  const actions = {
    onClick: jest.fn(),
  };
  const component = <Item {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('Item', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should render name when no imageSrc passed', () => {
    const name = 'Test label name';
    const imageSrc = '';
    const { shallowComponent } = setup({ name, imageSrc });
    const expectedLabel = displayLabel(name, imageSrc);
    expect(shallowComponent.contains(expectedLabel)).toBe(true);
  });

  it('should render imageSrc when is passed', () => {
    const name = 'Test label name';
    const imageSrc = 'src/path/to/some/image.png';
    const { shallowComponent } = setup({ name, imageSrc });
    const expectedLabel = displayLabel(name, imageSrc);
    expect(shallowComponent.contains(expectedLabel)).toBe(true);
  });

  it('should call onClick after component click', () => {
    const { shallowComponent, actions } = setup();
    expect(actions.onClick.mock.calls.length).toEqual(0);
    shallowComponent.simulate('click');
    expect(actions.onClick.mock.calls.length).toEqual(1);
  });
});
