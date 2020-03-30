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
      return fn(combination.slice().reverse());
    }
    for (let i = start; i < array.length; i += 1) {
      const j = count - 1;
      combination[j] = array[i];
      combine(j, i + 1);
    }
    return null;
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
