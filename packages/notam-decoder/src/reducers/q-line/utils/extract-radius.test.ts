import { extractRadius } from '.'; // Adjust the path accordingly

describe('extractRadius function', () => {
  it('should correctly parse a valid string number', () => {
    const result = extractRadius('123');
    expect(result).toEqual(123);
  });

  it('should return 0 for an empty string', () => {
    const result = extractRadius('');
    expect(result).toEqual(0);
  });

  it('should correctly parse a single-digit string number', () => {
    const result = extractRadius('7');
    expect(result).toEqual(7);
  });

  it('should return NaN for a non-numeric string', () => {
    const result = extractRadius('abc');
    expect(Number.isNaN(result)).toBeTruthy();
  });

  // Additional test cases can be added if needed...
});
