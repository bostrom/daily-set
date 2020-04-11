import React, { useState } from 'react';
import { arrayOf, string, shape } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Card from './Card';
import { Grid, ResultGrid } from './Grid';
import PuzzleComplete from './PuzzleComplete';

const Result = styled.div``;
const Game = styled.div``;

const Layout = styled.div`
  display: flex;
  min-width: 500px;

  @media (max-width: 500px) {
    flex-wrap: wrap;
  }

  ${Game} {
    min-width: 500px;
    flex: 1 1 auto;
    padding: 10px;
  }
  ${Result} {
    flex: 0 0 300px;
    min-width: 200px;
    text-align: center;
    @media (max-width: 500px) {
      flex-grow: 1;
    }
  }
`;

function Puzzle({ puzzle, startTime }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [foundSets, setFoundSets] = useState([]);
  const [individualSetTimes, setIndividualSetTimes] = useState([]);

  const { sets: correctSets, cards } = puzzle;

  const selectCard = cardCode => {
    if (selectedCards.indexOf(cardCode) > -1) {
      setSelectedCards(selectedCards.filter(c => c !== cardCode));
    } else {
      setSelectedCards([...selectedCards, cardCode]);
    }
  };

  if (selectedCards.length === 3) {
    if (
      correctSets.find(
        set => set.sort().join() === selectedCards.sort().join(),
      ) &&
      !foundSets.find(set => set.sort().join() === selectedCards.sort().join())
    ) {
      setFoundSets([...foundSets, selectedCards]);
      setIndividualSetTimes([...individualSetTimes, moment()]);
      // setMessage('You found a set!');
    } else {
      // setMessage('Not a set');
    }
    setSelectedCards([]);
  }

  return (
    <>
      <Layout>
        <Game>
          {foundSets.length === 6 ? (
            <PuzzleComplete
              startTime={startTime}
              individualSetTimes={individualSetTimes}
            />
          ) : (
            <Grid>
              {cards.map(cardCode => (
                <Card
                  key={cardCode}
                  code={cardCode}
                  onClick={() => selectCard(cardCode)}
                  selected={selectedCards.indexOf(cardCode) > -1}
                />
              ))}
            </Grid>
          )}
        </Game>
        <Result>
          <h2>Found sets</h2>
          <ResultGrid>
            {foundSets.map(foundSet =>
              foundSet.map(cardCode => <Card key={cardCode} code={cardCode} />),
            )}
            {new Array((correctSets.length - foundSets.length) * 3)
              .fill()
              .map((_, i) => (
                <Card key={`slot_${i}`} code="----" /> // eslint-disable-line
              ))}
          </ResultGrid>
        </Result>
      </Layout>
    </>
  );
}

Puzzle.propTypes = {
  puzzle: shape({
    cards: arrayOf(string),
    sets: arrayOf(arrayOf(string)),
  }).isRequired,
  startTime: shape({}).isRequired,
};

export default Puzzle;
