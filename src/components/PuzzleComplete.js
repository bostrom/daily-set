import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { stripIndents, oneLineTrim } from 'common-tags';
import moment from 'moment';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 20px;
  text-align: center;

  span {
    font-size: 8rem;
  }
`;

const SetTimes = styled.ol`
  list-style-position: outside;
  width: min-content;
  margin-left: auto;
  margin-right: auto;

  li {
    text-align: left;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(87, 147, 255);
  font-size: 1rem;
`;

const durationString = (from, to = moment(), short) => {
  const duration = moment.duration(to.diff(from));
  return short
    ? oneLineTrim`
      ${duration.get('minutes')}:
      ${duration.get('seconds')}.
      ${duration.get('milliseconds')}`
    : stripIndents`
      ${duration.get('minutes')} minutes and
      ${duration.get('seconds')}.${duration.get('milliseconds')} seconds
    `;
};

function PuzzleComplete({ startTime, individualSetTimes }) {
  const puzzleDuration = durationString(startTime);

  const tryAgain = () => {
    window.location.reload();
  };

  return (
    <Wrap>
      <span role="img" aria-label="Party popper">
        🎉
      </span>
      <h1>Hooray!</h1>
      <p>You completed the puzzle in {puzzleDuration}!</p>
      <h2>Individual Set times</h2>
      <SetTimes>
        {individualSetTimes.map((setTime, index) => {
          const from = index === 0 ? startTime : individualSetTimes[index - 1];

          return <li>{durationString(from, setTime, true)}</li>;
        })}
      </SetTimes>
      <Button type="button" onClick={tryAgain}>
        Try again
      </Button>
    </Wrap>
  );
}

PuzzleComplete.propTypes = {
  startTime: shape({}).isRequired,
  individualSetTimes: arrayOf(shape({})).isRequired,
};

export default PuzzleComplete;
