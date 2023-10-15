import { DecodedNotam } from '../../types';
import {
  extractAttention,
  extractLatLong,
  extractRadius,
  extractRules,
  extractScope,
  parseCode,
} from './utils';

const regexQLine = /(^|\s)Q\) (.*)/;
const regexQParts =
  /Q\)([A-Z]{3,4})\/([A-Z]{5})\/(IV|I|V)\/([A-Z]{1,3})\/([A-Z]{1,2})\/([0-9]{3})\/([0-9]{3})\/([0-9]{4})(N|S)([0-9]{5})(E|W)([0-9]{3}|)/;

const reducer = (notam: DecodedNotam, line: string): DecodedNotam => {
  if (notam.metadata.parsedQ) {
    return notam;
  }

  const matchesQLine = line.match(regexQLine);
  if (matchesQLine) {
    line = line.replace(/ /g, '');
    const matchesQParts = line.match(regexQParts);

    if (matchesQParts) {
      const fir = matchesQParts[1];
      const code = matchesQParts[2];
      const title = parseCode(code);
      const rules = extractRules(matchesQParts[3]);
      const attention = extractAttention(matchesQParts[4]);
      const scope = extractScope(matchesQParts[5]);

      const lowerLimit = parseInt(matchesQParts[6], 10);
      const upperLimit = parseInt(matchesQParts[7], 10);
      const [latitude, longitude] = extractLatLong(
        matchesQParts[8],
        matchesQParts[9],
        matchesQParts[10],
        matchesQParts[11]
      );

      const radius = extractRadius(matchesQParts[12]);

      return {
        ...notam,
        fir,
        code,
        title,
        rules,
        attention,
        scope,
        position: {
          lowerLimit,
          upperLimit,
          latitude,
          longitude,
          radius,
        },
        metadata: { ...notam.metadata, parsedQ: true },
      };
    }
  }
  return notam;
};

export default reducer;
