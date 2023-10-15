import { DecodedNotam } from '../../types';
import { default as reducer } from '.';
describe('reducer', () => {
  let notam: DecodedNotam;
  beforeEach(() => {
    notam = {
      fir: '',
      metadata: {
        parsedA: false,
      },
    } as DecodedNotam;
  });
  it('should return the notam unchanged if parsedA is true', () => {
    notam = {
      fir: '',
      metadata: {
        parsedA: true,
      },
    } as DecodedNotam;
    const line = 'A) FIR';
    const result = reducer(notam, line);
    expect(result).toEqual(notam);
  });

  it('should update the fir and set parsedA to true if line matches', () => {
    const line = 'A) FIR';
    const result = reducer(notam, line);
    expect(result.fir).toEqual('FIR');
    expect(result.metadata.parsedA).toBeTruthy;
  });

  it('should return the notam unchanged if line does not match', () => {
    const line = 'B) FIR';
    const result = reducer(notam, line);
    expect(result.fir).toEqual('');
  });
});
