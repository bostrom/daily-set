import React from 'react';
import moment from 'moment';
import Puzzle from './components/Puzzle';
import { generateSetPuzzleWithSolution } from './utils/dailySetGenerator';

function App() {
  const puzzle = generateSetPuzzleWithSolution(12, 6);
  const startTime = moment();

  return <Puzzle puzzle={puzzle} startTime={startTime} />;
}

export default App;
