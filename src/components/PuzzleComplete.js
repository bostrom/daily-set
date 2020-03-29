import React from 'react';
import { shape } from 'prop-types';
import { stripIndents } from 'common-tags';
import moment from 'moment';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 20px;
  text-align: center;

  span {
    font-size: 8rem;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(87, 147, 255);
  font-size: 1rem;
`;

function PuzzleComplete({ startTime }) {
  const gameDuration = moment.duration(moment().diff(startTime));
  const durationString = stripIndents`
    ${gameDuration.get('minutes')} minutes,
    ${gameDuration.get('seconds')} seconds and
    ${gameDuration.get('milliseconds')} milliseconds
  `;

  const tryAgain = () => {
    window.location.reload();
  };

  return (
    <Wrap>
      <span role="img" aria-label="Party popper">
        🎉
      </span>
      <h1>Hooray!</h1>
      <p>You completed the puzzle in {durationString}!</p>
      <Button type="button" onClick={tryAgain}>
        Try again
      </Button>
    </Wrap>
  );
}

PuzzleComplete.propTypes = {
  startTime: shape({}),
};
PuzzleComplete.defaultProps = {
  startTime: undefined,
};

export default PuzzleComplete;
