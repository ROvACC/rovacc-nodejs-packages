import { DecodedNotam } from '../types';
import { abbr } from '../constants/abbr';

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

    // To match punctuation at the end of a word
    const punctuationRegex = /([.,;:!?-]+)$/;

    for (const word of splitted) {
      // Check if there's punctuation at the end of the word
      const match = word.match(punctuationRegex);
      const punctuation = match ? match[1] : ''; // Stores punctuation, if any
      const cleanWord = word.replace(punctuationRegex, ''); // Removes punctuation, if any

      if (abbr[cleanWord]) {
        translation.push(abbr[cleanWord].toUpperCase() + punctuation);
      } else if (
        !isNaN(parseInt(cleanWord.substr(3))) &&
        abbr[cleanWord.substr(0, 3)]
      ) {
        translation.push(
          `${abbr[cleanWord.substr(0, 3)].toUpperCase()} ${cleanWord.substr(
            3
          )}${punctuation}`
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
