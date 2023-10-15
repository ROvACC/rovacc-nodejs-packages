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

  const result = notamLines.reduce(
    (notam, line) =>
      parsers.reduce((notam, reducer) => reducer(notam, line), notam),
    decoded
  );
  return result;
};
