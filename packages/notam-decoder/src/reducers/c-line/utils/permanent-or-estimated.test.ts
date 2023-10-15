import { permanentOrEstimated } from './permanent-or-estimated';

describe('permanentOrEstimated function', () => {
  it('should set date to default and estimated to true', () => {
    const input = 'C) EST';
    const result = permanentOrEstimated(input);
    const expectedDate = new Date('2030-12-20T12:00:00Z');
    expect(result).to.deep.equal({
      dateEnd: expectedDate,
      estimated: true,
      permanent: false,
    });
  });

  it('should set date to default and permanent to true', () => {
    const input = 'C) PERM';
    const result = permanentOrEstimated(input);
    const expectedDate = new Date('2030-12-20T12:00:00Z');
    expect(result).to.deep.equal({
      dateEnd: expectedDate,
      estimated: false,
      permanent: true,
    });
  });

  it('should return undefined for non-matching strings', () => {
    const input = 'Non-matching string format';
    const result = permanentOrEstimated(input);
    expect(result).to.be.undefined;
  });
});
