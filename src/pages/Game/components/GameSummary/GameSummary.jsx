import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS, TEXT_SHADOW } from 'constants/styles';

const StyledGameSummary = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${COLORS.green};
`;

const Title = styled.h3`
  margin: 0 0 25px;
  font-size: 40px;
  font-weight: 900;
  color: #FFF;
  text-transform: uppercase;
  text-shadow: ${TEXT_SHADOW.standard};
`;

const SubTitle = styled.h4`
  margin: 0 0 6px;
  font-size: 32px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  text-shadow: ${TEXT_SHADOW.standard};
`;

const Score = styled.div`
  font-size: 46px;
  margin: 0;
  color: ${COLORS.yellow};
  font-weight: 900;
  text-shadow: ${TEXT_SHADOW.standard};
  letter-spacing: 1.4px;
`;

const BonusContent = styled.div`
  display: none;
  width: 63%;
  margin-top: 40px;
  padding: 15px;

  background: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const BonusTitle = styled.div`
  margin: 0 0 10px;
  color: #f35;
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
`;

const BonusesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BonusItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.5;
`;

export const formatScore = score => score.toLocaleString('en');

const GameSummary = ({ score }) => {
  return (
    <StyledGameSummary>
      <Title>Congratulations!</Title>
      <SubTitle>- Your Score -</SubTitle>
      <Score data-testid="score-points">{formatScore(score)}</Score>

      <BonusContent>
        <BonusTitle>Bonuses</BonusTitle>

        <BonusesList>
          <BonusItem>A x 3 - 250 bonus points</BonusItem>
          <BonusItem>B x 2 - 30 bonus points</BonusItem>
        </BonusesList>
      </BonusContent>
    </StyledGameSummary>
  );
};

GameSummary.propTypes = {
  score: PropTypes.number.isRequired,
};

export default GameSummary;
