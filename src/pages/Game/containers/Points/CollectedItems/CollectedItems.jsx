import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import PointItem from './PointItem';

const StyledCollectedItems = styled.div`
  height: calc(100% - 170px);
  overflow: auto;
`;

const PointsTable = styled.table`
  width: 100%;
  padding: 0 15px;
  table-layout: fixed;
  border-collapse: collapse;
  text-transform: uppercase;

  tbody tr {
    border-bottom: 1px solid #dedede;
    font-weight: 700;
    font-size: 19px;

    &:nth-child(2n) {
      background: #F2F2F2;
    }
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #88B647;
    color: #fff;
    font-weight: 700;
    letter-spacing: 1px;
    text-shadow: -3px 3px 0 rgba(0,0,0,0.25);
  }

  td, th {
    text-align: center;
    padding: 10px;
  }

  td:first-child,
  th:first-child {
    text-align: left;
  }

  td:last-child,
  th:last-child {
    text-align: right;
  }
`;

const CollectedItems = ({ collectedItems }) => {
  return (
    <StyledCollectedItems>
      <PointsTable>
        <Header />

        <tbody>
          {collectedItems.map(item => <PointItem key={item.name} {...item} />)}
        </tbody>
      </PointsTable>
    </StyledCollectedItems>
  );
};

CollectedItems.propTypes = {
  collectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      basePoints: PropTypes.number.isRequired,
      bonusPoints: PropTypes.number.isRequired,
      collection: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default CollectedItems;
