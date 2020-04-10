import React, { useState } from 'react';
import { arrayOf, string, shape } from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import PuzzleComplete from './PuzzleComplete';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
`;

const ResultGrid = styled(Grid)`
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  max-width: 180px;

  svg {
    height: 1.5rem;
    width: auto;
  }
`;

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
            <PuzzleComplete startTime={startTime} />
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
