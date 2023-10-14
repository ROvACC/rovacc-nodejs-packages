import { DecodedNotam } from '../types';

type Output = { dateEnd: Date; permanent: boolean; estimated: boolean };
const dateEndSimple = (line: string): Output | undefined => {
  const regex = /(^|\s)C\) ([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/;
  const matches = line.match(regex);

  if (matches) {
    let year;
    if (parseInt(matches[2]) > 50) {
      year = '19' + matches[2];
    } else {
      year = '20' + matches[2];
    }

    // Constructing a Date object
    const dateEnd = new Date(
      `${year}-${matches[3]}-${matches[4]}T${matches[5]}:${matches[6]}:00Z`
    );

    const permanent = false;
    return { dateEnd, permanent, estimated: false };
  }
  return undefined;
};

const dateEndPermanentOrEstimate = (line: string): Output | undefined => {
  const regex =
    /(^|\s)C\) ([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})\s?(EST|PERM)$/;
  const matches = line.match(regex);

  if (matches) {
    let year: string;
    if (parseInt(matches[2]) > 50) {
      year = '19' + matches[2];
    } else {
      year = '20' + matches[2];
    }

    const dateEnd = new Date(
      `${year}-${matches[3]}-${matches[4]}T${matches[5]}:${matches[6]}:00Z`
    );
    let estimated = false,
      permanent = false;
    if (matches[7] === 'EST') {
      estimated = true;
    } else if (matches[7] === 'PERM') {
      permanent = true;
    }

    return { dateEnd, estimated, permanent };
  }
  return undefined;
};

const permanentOrEstimated = (line: string): Output | undefined => {
  const regex = /(^|\s)C\) (EST|PERM)$/;
  const matches = line.match(regex);

  if (matches) {
    // Setting a default Date object for the specified date and time
    const dateEnd = new Date('2030-12-20T12:00:00Z');

    const estimated = matches[2] === 'EST';
    const permanent = matches[2] === 'PERM';
    return { dateEnd, permanent, estimated };
  }
  return undefined;
};

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
