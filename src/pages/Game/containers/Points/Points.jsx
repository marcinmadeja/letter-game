import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from 'constants/styles';
import Button from 'components/Button/Button';
import { calculateBonus, calculateTotalScore } from '../../utils/utils';
import PointBlock from '../../components/PointBlock/PointBlock';
import CollectedItems from './CollectedItems/CollectedItems';

const StyledPoints = styled.div`
  height: calc(100% - 51px);
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

class Points extends React.Component {
  render() {
    const { collectedItems, startNewGame } = this.props;
    const totalScore = calculateTotalScore(collectedItems);
    const totalBonus = calculateBonus(collectedItems);

    return (
      <StyledPoints>
        <CollectedItems collectedItems={collectedItems} />

        <PointBlock
          label="Bonuses"
          points={totalBonus}
          backgroundColor={COLORS.red}
          data-testid="bonuses"
        />

        <PointBlock
          label="Total"
          points={totalScore}
          data-testid="total"
        />

        <Footer>
          <Button
            onClick={startNewGame}
            size="big"
            variant="hero"
            data-testid="new-game-button"
          >
            NEW GAME
          </Button>
        </Footer>
      </StyledPoints>
    );
  }
}

Points.propTypes = {
  collectedItems: PropTypes.array.isRequired,
  startNewGame: PropTypes.func.isRequired,
};

export default Points;
