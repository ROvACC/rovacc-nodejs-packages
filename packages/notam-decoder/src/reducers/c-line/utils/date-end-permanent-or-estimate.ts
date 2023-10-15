import { Output } from '../types';

export const dateEndPermanentOrEstimate = (
  line: string
): Output | undefined => {
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
