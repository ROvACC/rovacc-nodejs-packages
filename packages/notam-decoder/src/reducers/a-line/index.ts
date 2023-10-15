import { DecodedNotam } from '../../types';

const reducer = (notam: DecodedNotam, line: string): DecodedNotam => {
  if (notam.metadata.parsedA) {
    return notam;
  }
  const matches = line.match(/(^|\s)A\) (.*)/);
  if (!notam.metadata.parsedA && matches) {
    return {
      ...notam,
      fir: matches[2],
      metadata: {
        ...notam.metadata,
        parsedA: true,
      },
    };
  }
  return notam;
};

export default reducer;
