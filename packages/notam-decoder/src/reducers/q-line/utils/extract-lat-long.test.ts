import { extractLatLong } from '.';
import { describe, expect, it, vi } from 'vitest';
import * as convertDec from './convert-dec';

describe('extractLatLong function', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle N latitude and E longitude correctly', () => {
    vi.spyOn(convertDec, 'convertDec')
      .mockReturnValueOnce(12.5)
      .mockReturnValueOnce(77.5);

    const result = extractLatLong('1230', 'N', '01233', 'E');
    expect(result).toEqual([12.5, 77.5]);
  });

  it('should handle S latitude and W longitude correctly', () => {
    vi.spyOn(convertDec, 'convertDec')
      .mockReturnValueOnce(12.5)
      .mockReturnValueOnce(77.5);

    const result = extractLatLong('1230', 'S', '12330', 'W');
    expect(result).toEqual([-12.5, -77.5]);
  });

  it('should handle S latitude and E longitude correctly', () => {
    vi.spyOn(convertDec, 'convertDec')
      .mockReturnValueOnce(12.5)
      .mockReturnValueOnce(77.5);

    const result = extractLatLong('1230', 'S', '12330', 'E');
    expect(result).toEqual([-12.5, 77.5]);
  });

  it('should handle N latitude and W longitude correctly', () => {
    vi.spyOn(convertDec, 'convertDec')
      .mockReturnValueOnce(12.5)
      .mockReturnValueOnce(77.5);

    const result = extractLatLong('1230', 'N', '12330', 'W');
    expect(result).toEqual([12.5, -77.5]);
  });
});
