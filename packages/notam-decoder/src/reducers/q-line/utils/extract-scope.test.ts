import { extractScope } from '.';

describe('extractScope function', () => {
  it('should decode "A" as "Airport warning"', () => {
    const result = extractScope('A');
    expect(result).toEqual('Airport warning');
  });

  it('should decode "E" as "Enroute warning"', () => {
    const result = extractScope('E');
    expect(result).toEqual('Enroute warning');
  });

  it('should decode "W" as "Navigation warning"', () => {
    const result = extractScope('W');
    expect(result).toEqual('Navigation warning');
  });

  it('should decode "K" as "Checklist"', () => {
    const result = extractScope('K');
    expect(result).toEqual('Checklist');
  });

  it('should decode "AE" as "Airport/Enroute warning"', () => {
    const result = extractScope('AE');
    expect(result).toEqual('Airport/Enroute warning');
  });

  it('should decode "AW" as "Airport/Navigation warning"', () => {
    const result = extractScope('AW');
    expect(result).toEqual('Airport/Navigation warning');
  });

  it('should return undefined for an unrecognized code', () => {
    const result = extractScope('Z');
    expect(result).toBeUndefined();
  });

  it('should return undefined for an empty string', () => {
    const result = extractScope('');
    expect(result).toBeUndefined();
  });
});
