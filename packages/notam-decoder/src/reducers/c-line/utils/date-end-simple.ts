import { Output } from '../types';

export const dateEndSimple = (line: string): Output | undefined => {
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
