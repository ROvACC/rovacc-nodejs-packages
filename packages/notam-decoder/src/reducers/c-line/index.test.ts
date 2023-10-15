import * as utils from './utils';
import reducer from '.';
import { DecodedNotam } from '../../types';
import { vi } from 'vitest';

describe('reducer function', () => {
  const mockNotam: DecodedNotam = {
    duration: {},
    metadata: { parsedC: false },
  } as unknown as DecodedNotam;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('recognizes a line parsed by dateEndSimple', () => {
    vi.spyOn(utils, 'dateEndSimple').mockReturnValueOnce({
      dateEnd: new Date(),
      permanent: false,
      estimated: false,
    });
    const result = reducer(mockNotam, 'line matching dateEndSimple');
    expect(result.metadata.parsedC).to.be.true;
    // ... other assertions based on mocked return of dateEndSimple ...
  });

  it('recognizes a line parsed by dateEndPermanentOrEstimate', () => {
    vi.spyOn(utils, 'dateEndPermanentOrEstimate').mockReturnValueOnce({
      dateEnd: new Date(),
      permanent: false,
      estimated: true,
    });
    const result = reducer(
      mockNotam,
      'line matching dateEndPermanentOrEstimate'
    );
    expect(result.metadata.parsedC).to.be.true;
    // ... other assertions based on mocked return of dateEndPermanentOrEstimate ...
  });

  it('recognizes a line parsed by permanentOrEstimated', () => {
    vi.spyOn(utils, 'permanentOrEstimated').mockReturnValueOnce({
      dateEnd: new Date(),
      permanent: true,
      estimated: false,
    });
    const result = reducer(mockNotam, 'line matching permanentOrEstimated');
    expect(result.metadata.parsedC).to.be.true;
    // ... other assertions based on mocked return of permanentOrEstimated ...
  });

  it('returns the notam unchanged for unrecognized lines', () => {
    const result = reducer(mockNotam, 'unrecognized line');
    expect(result).to.deep.equal(mockNotam);
  });

  it('does not process a notam if parsedC metadata is already true', () => {
    const alreadyParsedNotam = {
      ...mockNotam,
      metadata: { parsedC: true },
    } as unknown as DecodedNotam;
    const result = reducer(alreadyParsedNotam, 'any line');
    expect(result).to.deep.equal(alreadyParsedNotam);
  });
});
