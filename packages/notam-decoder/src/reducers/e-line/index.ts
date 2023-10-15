import { DecodedNotam } from '../../types';
import { abbr } from '../../constants/abbr';

const reducer = (notam: DecodedNotam, line: string): DecodedNotam => {
  if (notam.metadata.parsedE) {
    return notam;
  }

  const regex = /(^|\s)E\) (.*)/;
  const matches = line.match(regex);

  if (matches) {
    let extracted = matches[2].trim();
    if (extracted[extracted.length - 1] === ')') {
      extracted = extracted.slice(0, -1);
    }
    const translation: string[] = [];
    const splitted = extracted.split(' ');

    const punctuationRegex = /([.,;:!?-]+)$/;

    for (const word of splitted) {
      const match = word.match(punctuationRegex);
      const punctuation = match ? match[1] : '';
      const cleanWord = word.replace(punctuationRegex, '');

      if (abbr[cleanWord]) {
        translation.push(abbr[cleanWord].toUpperCase() + punctuation);
      } else if (
        !isNaN(parseInt(cleanWord.substring(3))) &&
        abbr[cleanWord.substring(0, 3)]
      ) {
        translation.push(
          [
            abbr[cleanWord.substring(0, 3)].toUpperCase(),
            ' ',
            cleanWord.substring(3),
            punctuation,
          ].join()
        );
      } else {
        translation.push(cleanWord + punctuation);
      }
    }
    const text = translation.join(' ');

    return {
      ...notam,
      text,
      metadata: {
        ...notam.metadata,
        parsedE: true,
      },
    };
  }
  return notam;
};

export default reducer;
