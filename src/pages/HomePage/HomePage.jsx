import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';
import PageContent from 'components/PageContent/PageContent';

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  margin: 0 0 35px;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 2px;
`;

const StyledHomePage = styled.div`
  height: 100%;
  margin: -15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
`;

const Text = styled.div`
  margin-bottom: 40px;
  line-height: 1.4;
  font-size: 19px;
  letter-spacing: 1px;
`;

const HomePage = () => {
  return (
    <PageContent>
      <StyledHomePage>
        <Title>Instruction</Title>

        <Text>
          Collect letters and try to score the highest result. Some letters are scored differently. Try to remember which one of them has the greatest points value.
          <br /><br />
          Be aware of numbers. You'll lose time when You click them.
          <br /><br />
          Look also for items with a clock icon. They'll give You extra time, but crossed clock icon will give you a time penalty.
        </Text>

        <Button
          size="big"
          variant="hero"
          SpecialElement={<StyledLink to="/game" />}
        >
          Start game
        </Button>
      </StyledHomePage>
    </PageContent>
  );
};

export default HomePage;
