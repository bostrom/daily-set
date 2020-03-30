const dimensions = 4;

/* Generate a random card. */
export function generateRandomCard() {
  const card = [-1, -1, -1, -1];
  for (let i = 0; i < dimensions; i += 1) {
    card[i] = Math.floor(Math.random() * 3);
  }
  return card;
}

/* Generate all possible combinations. */
export function generateDeck() {}

/* Is PROPERTY the same in the cards C1, C2, C3? */
export function cardPropertySame(property, c1, c2, c3) {
  return c1[property] === c2[property] && c2[property] === c3[property];
}

/* Is PROPERTY all different in the cards C1, C2, C3? */
export function cardPropertyAllDifferent(property, c1, c2, c3) {
  return (
    c1[property] !== c2[property] &&
    c1[property] !== c3[property] &&
    c2[property] !== c3[property]
  );
}

/* Do the cards C1, C2 and C3 constitute a proper set? */
export function isSet(c1, c2, c3) {
  for (let i = 0; i < dimensions; i += 1) {
    if (
      !(
        cardPropertySame(i, c1, c2, c3) ||
        cardPropertyAllDifferent(i, c1, c2, c3)
      )
    ) {
      return false;
    }
  }
  return true;
}

/* Apply fn to all combinations of length combinationLength in
 * array. */
export function mapCombinations(fn, array, combinationLength) {
  const combination = array.slice(0, combinationLength);

  const combine = (count, start) => {
    if (!count) {
      fn(combination.slice().reverse());
    } else {
      for (let i = start; i < array.length; i += 1) {
        const j = count - 1;
        combination[j] = array[i];
        combine(j, i + 1);
      }
    }
  };
  combine(combinationLength, 0);
}

/* How many sets in a puzzle? */
export function setCountInPuzzle(puzzle) {
  let setCount = 0;
  const fn = combination => {
    if (isSet(combination[0], combination[1], combination[2])) {
      setCount += 1;
    }
  };

  mapCombinations(fn, puzzle, 3);
  return setCount;
}

/* Are card1 and card2 equal */
export function cardsEqual(card1, card2) {
  for (let i = 0; i < card1.length; i += 1) {
    if (!(card1[i] === card2[i])) {
      return false;
    }
  }
  return true;
}

/* Find all the sets in a puzzle */
export function solveSetPuzzle(puzzle) {
  const sets = [];
  mapCombinations(
    combination => {
      const [a, b, c] = combination;
      if (isSet(a, b, c)) {
        sets.push(combination);
      }
    },
    puzzle,
    3,
  );
  return sets;
}

/* Generate a set of size puzzleSize with desiredSetCount sets */
export function generateSetPuzzle(puzzleSize, desiredSetCount) {
  let cards = [];
  for (let i = 0; i < puzzleSize; i += 1) {
    cards.push(generateRandomCard());
  }

  let currentSetCount = setCountInPuzzle(cards);
  let newCard;
  let horizon = [];

  /* Is card unique within the current set of card? (Duplicates not
   * allowed) */
  const isCardUnique = card => {
    for (let i = 0; i < cards.length; i += 1) {
      if (cardsEqual(card, cards[i])) {
        return false;
      }
    }
    return true;
  };

  /* Generate a new, random, unique card. */
  const pickNewCard = () => {
    let unique = false;
    do {
      newCard = generateRandomCard();
      unique = isCardUnique(newCard);
    } while (!unique);
  };

  /* Create a set of puzzles (horizon) that include the new card */
  const expandHorizon = () => {
    horizon = [];

    for (let i = 0; i < cards.length; i += 1) {
      const hypothetical = cards.slice();
      hypothetical[i] = newCard;
      horizon.push(hypothetical);
    }
  };

  /* Out of the puzzles on the horizon, pick one that brings us
   * closer to the desired amount of sets. */
  const pickNewState = () => {
    const higherUtilityStates = [];

    // Find better states.
    for (let i = 0; i < horizon.length; i += 1) {
      const hypothetical = horizon[i];
      const setCountInState = setCountInPuzzle(hypothetical);
      let overOrUnderDesired;

      if (currentSetCount < desiredSetCount) {
        overOrUnderDesired = 1;
      } else {
        overOrUnderDesired = -1;
      }

      const setCountDifference =
        (setCountInState - currentSetCount) * overOrUnderDesired;

      if (setCountDifference > 0) {
        higherUtilityStates.push(hypothetical);
      }
    }

    // Pick one at random.
    if (higherUtilityStates.length > 0) {
      cards =
        higherUtilityStates[
          Math.floor(Math.random() * higherUtilityStates.length)
        ];
    }

    currentSetCount = setCountInPuzzle(cards);
  };

  /* Loop until done */
  for (let i = 0; i < 1000; i += 1) {
    // Done?
    if (currentSetCount === desiredSetCount) {
      return cards;
    }

    pickNewCard();
    expandHorizon();
    pickNewState();
  }

  throw new Error('Failed to generate puzzle.');
}

/* Generate a puzzle with its solution in the form:
 *
 *  {
 *    cards: [...],
 *    sets: [[...], ...]
 *  }
 */

export function generateSetPuzzleWithSolution(puzzleSize, desiredSetCount) {
  let puzzle = generateSetPuzzle(puzzleSize, desiredSetCount);
  let sets = solveSetPuzzle(puzzle);

  // Massage to sorted string json representation.
  puzzle = puzzle.map(card => card.join(''));
  puzzle.sort();

  sets = sets.map(set => set.map(card => card.join('')).sort());

  return {
    cards: puzzle,
    sets: sets,
  };
}
