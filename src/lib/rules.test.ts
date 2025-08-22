import { judge } from '@/lib/rules';

describe('judge()', () => {
  it('ties when same', () => {
    expect(judge(1, 1)).toBe('tie'); // rock vs rock
  });

  it('wins when player beats computer', () => {
    expect(judge(1, 3)).toBe('win'); // rock > scissors
    expect(judge(4, 5)).toBe('win'); // lizard > spock
  });

  it('loses otherwise', () => {
    expect(judge(2, 4)).toBe('lose'); // paper < lizard
  });
});
