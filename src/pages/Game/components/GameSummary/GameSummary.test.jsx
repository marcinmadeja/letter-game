import React from 'react';
import GameSummary, { formatScore } from './GameSummary';

const defaultProps = {
  score: 0,
};

const setup = (props = {}) => {
  const actions = {};
  const component = <GameSummary {...defaultProps} {...actions} {...props} />;
  const shallowComponent = shallow(component);

  return {
    actions,
    component,
    shallowComponent,
  };
};

describe('GameSummary', () => {
  it('should render', () => {
    const { shallowComponent } = setup();
    expect(shallowComponent.exists()).toBe(true);
  });

  it('should render default value', () => {
    const { shallowComponent } = setup();
    const scoreElement = shallowComponent.find('[data-testid="score-points"]').dive();
    expect(scoreElement.text()).toEqual(formatScore(defaultProps.score));
  });

  it('should render passed value', () => {
    const score = 9999999;
    const { shallowComponent } = setup({ score: 9999999 });
    const scoreElement = shallowComponent.find('[data-testid="score-points"]').dive();
    expect(scoreElement.text()).toEqual(formatScore(score));
  });
});
