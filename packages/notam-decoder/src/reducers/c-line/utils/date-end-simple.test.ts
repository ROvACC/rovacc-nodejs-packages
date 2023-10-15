import { dateEndSimple } from './date-end-simple';

describe('dateEndSimple function', () => {
  it('should extract a date from a valid string and determine the century as 1900s', () => {
    const input = 'Some prefix C) 6512312359';
    const result = dateEndSimple(input);
    const expectedDate = new Date('1965-12-31T23:59:00Z');
    expect(result).to.deep.equal({
      dateEnd: expectedDate,
      permanent: false,
      estimated: false,
    });
  });

  it('should extract a date from a valid string and determine the century as 2000s', () => {
    const input = 'Some prefix C) 0512312359';
    const result = dateEndSimple(input);
    const expectedDate = new Date('2005-12-31T23:59:00Z');
    expect(result).to.deep.equal({
      dateEnd: expectedDate,
      permanent: false,
      estimated: false,
    });
  });

  it('should return undefined for a string that does not match the pattern', () => {
    const input = 'Invalid string without matching pattern';
    const result = dateEndSimple(input);
    expect(result).to.be.undefined;
  });
});
