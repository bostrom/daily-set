import { generateRandomCard } from './dailySetGenerator';

describe('Daily Set Generator', () => {
  describe('generateRandomCard', () => {
    it('should return four dimensions', () => {
      expect(generateRandomCard().length).toBe(4);
      expect(generateRandomCard().join()).not.toContain('-1');
    });
  });
  describe('generateDeck', () => {
    it.todo('test generateDeck');
  });
});
