import { extractRules } from '.'; // Adjust the path accordingly

describe('extractRules function', () => {
  it('should decode "I" as "IFR"', () => {
    const result = extractRules('I');
    expect(result).toEqual(['IFR']);
  });

  it('should decode "V" as "VFR"', () => {
    const result = extractRules('V');
    expect(result).toEqual(['VFR']);
  });

  it('should decode multiple rules correctly', () => {
    const result = extractRules('IV');
    expect(result).toEqual(['IFR', 'VFR']);
  });

  it('should return an empty array for an unrecognized code', () => {
    const result = extractRules('Z');
    expect(result).toEqual([]);
  });

  it('should handle a mixed input with both recognized and unrecognized codes', () => {
    const result = extractRules('IVZK');
    expect(result).toEqual(['IFR', 'VFR', 'Checklist']);
  });

  it('should return an empty array for an empty string', () => {
    const result = extractRules('');
    expect(result).toEqual([]);
  });
});
