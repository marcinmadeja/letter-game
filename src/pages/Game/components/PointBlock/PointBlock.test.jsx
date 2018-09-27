import React from 'react';
import PointBlock from './PointBlock';

const defaultProps = {
  label: '',
  points: 0,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <PointBlock {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('PointBlock', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should render label', () => {
    const labelString = 'Test label';
    const { shallowComponent } = setup({ label: labelString });
    expect(shallowComponent.contains(labelString)).toBe(true);
  });

  it('should render default points', () => {
    const { shallowComponent } = setup();
    const pointsElement = shallowComponent.find('[data-testid="points"]').dive();
    expect(pointsElement.text()).toBe(String(defaultProps.points));
  });

  it('should render passed points', () => {
    const points = 999999;
    const { shallowComponent } = setup({ points });
    const pointsElement = shallowComponent.find('[data-testid="points"]').dive();
    expect(pointsElement.text()).toBe(String(points));
  });
});
