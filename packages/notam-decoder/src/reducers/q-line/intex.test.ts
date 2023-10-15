import { DecodedNotam } from '../../types';

import { describe, expect, it, vi } from 'vitest';
import reducer from '.';
import * as utils from './utils';

describe('reducer function', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should correctly parse a Q line', () => {
    const initialNotam: DecodedNotam = {
      scope: '',
      code: '',
      position: {
        lowerLimit: 30,
        upperLimit: 90,
        latitude: 50,
        longitude: 70,
        radius: 10,
      },
      metadata: { parsedQ: false },
    } as unknown as DecodedNotam;

    vi.spyOn(utils, 'parseCode').mockReturnValueOnce('Sample Title');
    vi.spyOn(utils, 'extractAttention').mockReturnValueOnce(['Checklist']);
    vi.spyOn(utils, 'extractLatLong').mockReturnValueOnce([50, 70]);
    vi.spyOn(utils, 'extractRadius').mockReturnValueOnce(10);
    vi.spyOn(utils, 'extractRules').mockReturnValueOnce(['IFR']);
    vi.spyOn(utils, 'extractScope').mockReturnValueOnce('Checklist');

    const line = 'Q) LRBB/QAFXX/IV/NBO/E /000/999/4501N02531E234';
    const result = reducer(initialNotam, line);

    expect(result).toEqual({
      ...initialNotam,
      fir: 'LRBB',
      code: 'QAFXX',
      title: 'Sample Title',
      rules: ['IFR'],
      attention: ['Checklist'],
      scope: 'Checklist',
      position: {
        lowerLimit: 0,
        upperLimit: 999,
        latitude: 50,
        longitude: 70,
        radius: 10,
      },
      metadata: { ...initialNotam.metadata, parsedQ: true },
    });
  });
});
