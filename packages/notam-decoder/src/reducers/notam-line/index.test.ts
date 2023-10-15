import reducer from '.'; // Update this import path to the actual path of your reducer file.
import { DecodedNotam } from '../../types';

describe('reducer function', () => {
  const mockNotam: DecodedNotam = {
    notam: {},
    metadata: { parsedA: false },
  } as unknown as DecodedNotam;

  it('detects a NOTAMN type and extracts the code', () => {
    const line = '(NOTAMN QWULWUG)';
    const result = reducer(mockNotam, line);
    expect(result.notam).to.deep.equal({
      code: 'NOTAMN',
      type: 'new',
      affected: undefined,
    });
  });

  it('detects a NOTAMC type, extracts the code, and gets the affected NOTAM', () => {
    const line = '(NOTAMC QWULWUG ZXTYZX';
    const result = reducer(mockNotam, line);
    expect(result.notam).to.deep.equal({
      code: 'NOTAMC',
      type: 'cancel',
      affected: 'ZXTYZX',
    });
  });

  it('detects a NOTAMR type, extracts the code, and gets the affected NOTAM', () => {
    const line = '(NOTAMR QWULWUG ZXTYZX';
    const result = reducer(mockNotam, line);
    expect(result.notam).to.deep.equal({
      code: 'NOTAMR',
      type: 'replace',
      affected: 'ZXTYZX',
    });
  });

  it('returns the notam unchanged for unrecognized lines', () => {
    const line = 'Unrecognized line format';
    const result = reducer(mockNotam, line);
    expect(result).to.deep.equal(mockNotam);
  });

  it('does not process a notam if parsedA metadata is already true', () => {
    const alreadyParsedNotam = {
      ...mockNotam,
      metadata: { parsedA: true },
    } as unknown as DecodedNotam;
    const result = reducer(alreadyParsedNotam, 'any line');
    expect(result).to.deep.equal(alreadyParsedNotam);
  });
});
