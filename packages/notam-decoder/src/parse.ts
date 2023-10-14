import { DecodedNotam } from './types';
import { default as reducerALine } from './reducers/a-line';
import { default as reducerBLine } from './reducers/b-line';
import { default as reducerCLine } from './reducers/c-line';
import { default as reducerELine } from './reducers/e-line';
import { default as reducerQLine } from './reducers/q-line';
import { default as reducerNotamLine } from './reducers/notam-line';

export const decode = (notam: string): DecodedNotam => {
  const decoded: DecodedNotam = {
    raw: notam,
    text: '',
    fir: '',
    rules: [],
    attention: [],
    title: '',
    code: '',
    notam: {
      code: '',
      type: 'new',
    },
    position: {},
    duration: {
      permanent: false,
      estimated: false,
      dateBegin: new Date(),
      dateEnd: new Date(),
    },
    metadata: {
      parsedQ: false,
      parsedA: false,
      parsedB: false,
      parsedC: false,
      parsedE: false,
    },
  };

  const parsers = [
    reducerNotamLine,
    reducerQLine,
    reducerALine,
    reducerBLine,
    reducerCLine,
    reducerELine,
  ];

  const notamLines = notam
    .replace(/\r|\n|\\r|\\n/g, ' ')
    .split(/\s(?=[A-Z]\)\s)/);

  // const regexQLine = /(^|\s)Q\) (.*)/;
  // const regexQParts =
  //   /Q\)([A-Z]{3,4})\/([A-Z]{5})\/(IV|I|V)\/([A-Z]{1,3})\/([A-Z]{1,2})\/([0-9]{3})\/([0-9]{3})\/([0-9]{4})(N|S)([0-9]{5})(E|W)([0-9]{3}|)/;

  console.log(notamLines);

  const result = notamLines.reduce(
    (notam, line) =>
      parsers.reduce((notam, reducer) => reducer(notam, line), notam),
    decoded
  );
  console.log(result);

  // for (let line of notamLines) {
  //   line = line.trim();
  //   console.log({ line });
  //   const matchesQLine = line.match(regexQLine);
  //   console.log({ matchesQLine });
  //   if (matchesQLine && q === false) {
  //     line = line.replace(/ /g, '');
  //     const matchesQParts = line.match(regexQParts);
  //
  //     if (matchesQParts) {
  //       console.log({ matchesQParts });
  //       decoded.fir = matchesQParts[1];
  //       decoded.code = matchesQParts[2];
  //     }
  //   }
  // }
  return result;
};
