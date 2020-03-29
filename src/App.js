import React from 'react';
import moment from 'moment';
import Puzzle from './components/Puzzle';
import data from './daily-set-data.json';

function App() {
  const puzzle = data.puzzles[Math.floor(Math.random() * data.puzzles.length)];
  const startTime = moment();

  return <Puzzle puzzle={puzzle} startTime={startTime} />;
}

export default App;
