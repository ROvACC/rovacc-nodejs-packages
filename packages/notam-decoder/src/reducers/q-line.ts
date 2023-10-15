import { DecodedNotam, ScopeType } from '../types';
import { parseCode } from './utils/parse-code';

const regexQLine = /(^|\s)Q\) (.*)/;
const regexQParts =
  /Q\)([A-Z]{3,4})\/([A-Z]{5})\/(IV|I|V)\/([A-Z]{1,3})\/([A-Z]{1,2})\/([0-9]{3})\/([0-9]{3})\/([0-9]{4})(N|S)([0-9]{5})(E|W)([0-9]{3}|)/;

const extractRules = (stringRules: string): DecodedNotam['rules'] => {
  const notamRules: DecodedNotam['rules'] = [];
  const rules = Array.from(stringRules);

  for (const rule of rules) {
    switch (rule) {
      case 'I':
        notamRules.push('IFR');
        break;
      case 'V':
        notamRules.push('VFR');
        break;
      case 'K':
        notamRules.push('Checklist');
        break;
    }
  }
  return notamRules;
};

const extractAttention = (
  stringAttention: string
): DecodedNotam['attention'] => {
  const notamAttention: DecodedNotam['attention'] = [];
  const attentions = Array.from(stringAttention);

  for (const attention of attentions) {
    switch (attention) {
      case 'N':
        notamAttention.push('Immediate attention');
        break;
      case 'B':
        notamAttention.push('Operational significance');
        break;
      case 'O':
        notamAttention.push('Flight operations');
        break;
      case 'M':
        notamAttention.push('Misc');
        break;
      case 'K':
        notamAttention.push('Checklist');
        break;
    }
  }
  return notamAttention;
};

const extractScope = (stringScope: string): ScopeType | undefined => {
  switch (stringScope) {
    case 'A':
      return 'Airport warning';
    case 'E':
      return 'Enroute warning';
    case 'W':
      return 'Navigation warning';
    case 'K':
      return 'Checklist';
    case 'AE':
      return 'Airport/Enroute warning';
    case 'AW':
      return 'Airport/Navigation warning';
  }
  return undefined;
};

const convertDec = (dms: string, latlong: 'latitude' | 'longitude'): number => {
  let deg: string;
  let min: string;

  if (latlong === 'latitude') {
    deg = dms.substring(0, 2);
    min = dms.substring(2, 4);
  } else {
    deg = dms.substring(0, 3);
    min = dms.substring(3, 5);
  }

  return parseFloat(deg) + (parseFloat(min) * 60) / 3600;
};

const extractLatLong = (
  strLat: string,
  posLat: string,
  strLon: string,
  posLon: string
): [number, number] => {
  let latitude = convertDec(strLat, 'latitude');
  if (posLat === 'S') {
    latitude = -latitude;
  }
  let longitude = convertDec(strLon, 'longitude');
  if (posLon === 'W') {
    longitude = -longitude;
  }
  return [latitude, longitude];
};

const extractRadius = (strRadius: string): number => {
  return strRadius !== '' ? parseInt(strRadius, 10) : 0;
};

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
