import { DecodedNotam } from '../../types';
import {
  dateEndSimple,
  dateEndPermanentOrEstimate,
  permanentOrEstimated,
} from './utils';

const reducer = (notam: DecodedNotam, line: string): DecodedNotam => {
  if (notam.metadata.parsedC) {
    return notam;
  }

  const variations = [
    dateEndSimple,
    dateEndPermanentOrEstimate,
    permanentOrEstimated,
  ];

  for (const variation of variations) {
    const result = variation(line);
    if (result) {
      return {
        ...notam,
        duration: { ...notam.duration, ...result },
        metadata: { ...notam.metadata, parsedC: true },
      };
    }
  }
  return notam;
};

export default reducer;
