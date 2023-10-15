import reducer from '.';
import { abbr } from '../../constants/abbr';
import { DecodedNotam } from '../../types';

describe('reducer function', () => {
  const mockNotam: DecodedNotam = {
    text: '',
    metadata: { parsedE: false },
  } as unknown as DecodedNotam;

  it('translates abbreviations correctly', () => {
    const line = 'E) AD CLSD FOR TRAFFIC)';
    const result = reducer(mockNotam, line);
    expect(result.text).to.equal('AERODROME CLOSED FOR TRAFFIC');
  });

  it('handles punctuation at the end of words', () => {
    const line =
      'E) OPERATIONAL HOURS OF METEOROLOGICAL INFORMATION PROVIDED ARE TEMPORARY CHANGED AS FLW: MON-FRI: 0530-1330)';
    const result = reducer(mockNotam, line);
    expect(result.text).to.equal(
      'OPERATIONAL HOURS OF METEOROLOGICAL INFORMATION PROVIDED ARE TEMPORARY CHANGED AS FOLLOW(S): MON-FRI: 0530-1330'
    );
  });

  it('returns the notam unchanged for unrecognized lines', () => {
    const line = 'Unrecognized line format';
    const result = reducer(mockNotam, line);
    expect(result).to.deep.equal(mockNotam);
  });

  it('does not process a notam if parsedE metadata is already true', () => {
    const alreadyParsedNotam = {
      ...mockNotam,
      metadata: { parsedE: true },
    } as unknown as DecodedNotam;
    const result = reducer(alreadyParsedNotam, 'any line');
    expect(result).to.deep.equal(alreadyParsedNotam);
  });
});
