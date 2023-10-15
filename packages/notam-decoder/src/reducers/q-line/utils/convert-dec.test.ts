import { convertDec } from '.';

describe('convertDec function', () => {
  it('should correctly convert latitude DMS to decimal format', () => {
    const result = convertDec('1230', 'latitude');
    expect(result).toEqual(12.5);
  });

  it('should correctly convert longitude DMS to decimal format', () => {
    const result = convertDec('02330', 'longitude');
    expect(result).toEqual(23 + (30 * 60) / 3600);
  });

  it('should return 0 for an empty string and latitude', () => {
    const result = convertDec('', 'latitude');
    expect(result).toBeNaN;
  });

  it('should return 0 for an empty string and longitude', () => {
    const result = convertDec('', 'longitude');
    expect(result).toBeNaN;
  });
});
