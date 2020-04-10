import {
  generateRandomCard,
  cardPropertySame,
  cardPropertyAllDifferent,
  isSet,
  mapCombinations,
  setCountInPuzzle,
  cardsEqual,
  generateSetPuzzle,
  solveSetPuzzle,
  generateSetPuzzleWithSolution,
} from './dailySetGenerator';

describe('Daily Set Generator', () => {
  describe('generateRandomCard', () => {
    it('should return four dimensions', () => {
      expect(generateRandomCard().length).toBe(4);
      expect(generateRandomCard().join()).not.toContain('-1');
    });
  });

  describe('cardPropertySame', () => {
    it('should work', () => {
      expect(
        cardPropertySame(0, [0, 1, 2, 0], [0, 1, 2, 0], [0, 1, 2, 0]),
      ).toBe(true);
      expect(
        cardPropertySame(0, [0, 1, 2, 0], [0, 1, 2, 0], [1, 1, 2, 0]),
      ).toBe(false);
    });
  });

  describe('cardPropertyAllDifferent', () => {
    it('should work', () => {
      expect(
        cardPropertyAllDifferent(0, [0, 1, 2, 0], [1, 1, 2, 0], [2, 1, 2, 0]),
      ).toBe(true);
      expect(
        cardPropertyAllDifferent(0, [0, 1, 2, 0], [0, 1, 2, 0], [0, 1, 2, 0]),
      ).toBe(false);
    });
  });

  describe('isSet', () => {
    it('should work', () => {
      expect(isSet([0, 1, 2, 0], [1, 1, 2, 0], [2, 1, 2, 0])).toBe(true);
      expect(isSet([0, 1, 0, 1], [1, 2, 2, 0], [2, 0, 1, 2])).toBe(true);
      expect(isSet([0, 1, 2, 1], [1, 1, 2, 0], [2, 1, 2, 0])).toBe(false);
    });
  });

  describe('mapCombinations', () => {
    it('should work', () => {
      const res = [];
      mapCombinations(a => res.push(a), [1], 1);
      expect(res.length).toBe(1);
      expect(res).toStrictEqual([[1]]);
    });

    it('should also work', () => {
      const res = [];
      mapCombinations(a => res.push(a), [1, 2, 3], 1);
      expect(res).toStrictEqual([[1], [2], [3]]);
    });

    it('should work too', () => {
      const res = [];
      mapCombinations(a => res.push(a), [1, 2, 3], 2);
      expect(res).toStrictEqual([
        [1, 2],
        [1, 3],
        [2, 3],
      ]);
    });
  });

  describe('setCountInPuzzle', () => {
    it('should work', () => {
      const puzzle = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
      ];
      const setCount = setCountInPuzzle(puzzle);
      expect(setCount).toBe(0);
    });

    it('should also work', () => {
      const puzzle = [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [2, 0, 0, 0],
      ];
      const setCount = setCountInPuzzle(puzzle);
      expect(setCount).toBe(1);
    });

    it('should work too', () => {
      const puzzle = [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 1, 0, 0],
        [0, 1, 0, 1],
        [0, 2, 0, 2],
        [1, 1, 2, 2],
        [1, 2, 2, 1],
        [2, 0, 2, 1],
        [2, 0, 2, 2],
        [2, 1, 0, 2],
        [2, 1, 1, 2],
        [2, 2, 1, 0],
      ];
      const setCount = setCountInPuzzle(puzzle);
      expect(setCount).toBe(6);
    });
  });

  describe('cardsEqual', () => {
    it('should work', () => {
      expect(cardsEqual([0, 1, 2, 0], [1, 1, 2, 0])).toBe(false);
      expect(cardsEqual([0, 1, 2, 0], [0, 1, 2, 0])).toBe(true);
    });
  });

  describe('solveSetPuzzle', () => {
    it('should work', () => {
      const solution = solveSetPuzzle([
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [2, 0, 0, 0],
      ]);

      expect(solution).toStrictEqual([
        [
          [0, 0, 0, 0],
          [1, 0, 0, 0],
          [2, 0, 0, 0],
        ],
      ]);
    });

    it('should also work', () => {
      const puzzle = generateSetPuzzle(12, 3);
      const sets = solveSetPuzzle(puzzle);
      expect(sets.length).toBe(3);
    });
  });

  describe('generateSetPuzzle', () => {
    it('should work', () => {
      const puzzle = generateSetPuzzle(12, 1);
      expect(setCountInPuzzle(puzzle)).toBe(1);
    });

    it('should also work', () => {
      const puzzle = generateSetPuzzle(12, 6);
      expect(setCountInPuzzle(puzzle)).toBe(6);
    });
  });

  describe('generateSetPuzzleWithSolution', () => {
    it('should work', () => {
      const puzzle = generateSetPuzzleWithSolution(12, 6);
      const { cards, sets } = puzzle;
      expect(cards.length).toBe(12);
      expect(sets.length).toBe(6);
    });
  });

  describe('generateDeck', () => {
    it.todo('test generateDeck');
  });
});
