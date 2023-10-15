import { extractAttention } from '.';

describe('extractAttention function', () => {
  it('should decode "N" as "Immediate attention"', () => {
    const result = extractAttention('N');
    expect(result).toEqual(['Immediate attention']);
  });

  it('should decode "B" as "Operational significance"', () => {
    const result = extractAttention('B');
    expect(result).toEqual(['Operational significance']);
  });

  it('should decode multiple attentions correctly', () => {
    const result = extractAttention('NB');
    expect(result).toEqual(['Immediate attention', 'Operational significance']);
  });

  it('should return an empty array for an unrecognized code', () => {
    const result = extractAttention('Z');
    expect(result).toEqual([]);
  });

  it('should handle a mixed input with both recognized and unrecognized codes', () => {
    const result = extractAttention('NBOZM');
    expect(result).toEqual([
      'Immediate attention',
      'Operational significance',
      'Flight operations',
      'Misc',
    ]);
  });

  it('should return an empty array for an empty string', () => {
    const result = extractAttention('');
    expect(result).toEqual([]);
  });
});
