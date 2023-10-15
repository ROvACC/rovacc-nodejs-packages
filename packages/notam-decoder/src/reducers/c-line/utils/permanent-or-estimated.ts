import { Output } from '../types';
export const permanentOrEstimated = (line: string): Output | undefined => {
  const regex = /(^|\s)C\) (EST|PERM)$/;
  const matches = line.match(regex);

  if (matches) {
    const dateEnd = new Date('2030-12-20T12:00:00Z');

    const estimated = matches[2] === 'EST';
    const permanent = matches[2] === 'PERM';
    return { dateEnd, permanent, estimated };
  }
  return undefined;
};
