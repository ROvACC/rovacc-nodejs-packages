import { parseCode } from '.';

describe('parseCode function', () => {
  it('should correctly parse an airspace code', () => {
    const result = parseCode('AAA1');
    expect(result).toEqual('Airspace organization Minimum altitude');
  });

  it('should correctly parse a comradar code', () => {
    const result = parseCode('AAAAC');
    expect(result).toEqual(
      'Airspace organization Minimum altitude Withdrawn for maintenance'
    );
  });
});
