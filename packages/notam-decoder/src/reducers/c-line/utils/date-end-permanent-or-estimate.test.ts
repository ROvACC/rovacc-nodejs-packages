import { dateEndPermanentOrEstimate } from './date-end-permanent-or-estimate';

describe('dateEndPermanentOrEstimate function', () => {
  it('should extract a date and set estimated to true', () => {
    const input = 'C) 2205121523 EST';
    const result = dateEndPermanentOrEstimate(input);
    const expectedDate = new Date('2022-05-12T15:23:00Z');
    expect(result).to.deep.equal({
      dateEnd: expectedDate,
      estimated: true,
      permanent: false,
    });
  });

  it('should extract a date and set permanent to true', () => {
    const input = 'C) 7912151230 PERM';
    const result = dateEndPermanentOrEstimate(input);
    const expectedDate = new Date('1979-12-15T12:30:00Z');
    expect(result).to.deep.equal({
      dateEnd: expectedDate,
      estimated: false,
      permanent: true,
    });
  });

  it('should return undefined for non-matching strings', () => {
    const input = 'Non-matching string format';
    const result = dateEndPermanentOrEstimate(input);
    expect(result).to.be.undefined;
  });
});
