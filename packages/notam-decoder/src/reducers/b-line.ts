import { DecodedNotam } from '../types';

const reducer = (notam: DecodedNotam, line: string): DecodedNotam => {
  if (notam.metadata.parsedB) {
    return notam;
  }

  const regex = /(^|\s)B\) ([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/;
  const matches = line.match(regex);

  if (matches) {
    let year;
    if (parseInt(matches[2]) > 50) {
      year = '19' + matches[2];
    } else {
      year = '20' + matches[2];
    }
    const dateBegin = new Date(
      `${year}-${matches[3]}-${matches[4]}T${matches[5]}:${matches[6]}:00Z`
    );
    return {
      ...notam,
      metadata: {
        ...notam.metadata,
        parsedB: true,
      },
      duration: {
        ...notam.duration,
        dateBegin,
      },
    };
  }
  return notam;
};

export default reducer;
