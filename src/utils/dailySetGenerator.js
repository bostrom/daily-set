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
        CardPropertySame(i, c1, c2, c3) ||
        CardPropertyAllDifferent(i, c1, c2, c3)
      )
    ) {
      return false;
    }
  }
  return true;
}

export function mapCombinations(fn, array, combinationLength) {
  const combination = array.slice(0, combinationLength);

  const combine = (count, start) => {
    if (!count) {
      fn(combination);
    }

    for (let i = start; i < array.length; i += 1) {
      const j = count - 1;
      combination[j] = array[i];
      combine(j, i + 1);
    }
  };

  return combine(combinationLength, 0);
}

/* How many sets in a puzzle? */
export function setCountInPuzzle(puzzle, subSetIndex) {
  // base case
  if (subSetIndex === puzzle.length - 3) {
    if (
      isSet(
        puzzle[subSetIndex],
        puzzle[subSetIndex + 1],
        puzzle[subSetIndex + 2],
      )
    ) {
      return 1;
    }
    return 0;
  }

  // recursive case
  const first = puzzle[0];
  let second;
  let third;
  let sets = 0;
  for (let i = subSetIndex + 1; i < puzzle.length - 3; i += 1) {
    second = puzzle[i];
    for (let j = subSetIndex + i; j < puzzle.length - 2; j += 1) {
      third = puzzle[j];
      if (isSet(puzzle[first], puzzle[second], puzzle[third])) {
        sets += 1;
      }
    }
  }

  return sets + SetCountInPuzzle(puzzle, subSetIndex + 1);
}
