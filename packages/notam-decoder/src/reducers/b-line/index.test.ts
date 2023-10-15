import reducer from '.';
import { DecodedNotam } from '../../types';

describe('reducer', () => {
  let notam: DecodedNotam;

  beforeEach(() => {
    notam = {
      metadata: {
        parsedB: false,
      },
      duration: {
        dateBegin: null,
      },
    } as unknown as DecodedNotam;
  });

  it('should return the notam unchanged if parsedB is true', () => {
    const line = 'B) 2101010000';
    notam.metadata.parsedB = true;

    const result = reducer(notam, line);

    expect(result).toEqual(notam);
  });

  it('should update the parsedB property to true and set the dateBegin property', () => {
    const line = 'B) 2101010000';

    const result = reducer(notam, line);

    expect(result.metadata.parsedB).toBe(true);
    expect(result.duration.dateBegin).toEqual(new Date('2021-01-01T00:00:00Z'));
  });
  it('should set year correctly based on matched value', () => {
    const notam: DecodedNotam = {
      metadata: { parsedB: false },
      duration: {},
    } as unknown as DecodedNotam;
    const line = 'Some text B) 5512011415';
    const result = reducer(notam, line);

    expect(result.duration.dateBegin.toISOString()).toBe(
      '1955-12-01T14:15:00.000Z'
    );
  });

  it('should return unchanged notam if no match is found', () => {
    const notam: DecodedNotam = {
      metadata: { parsedB: false },
      duration: {},
    } as unknown as DecodedNotam;
    const line = 'Some random text';
    const result = reducer(notam, line);
    expect(result).toBe(notam);
  });
});
