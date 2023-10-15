import { DecodedNotam, NotamType } from '../../types';

const reducer = (notam: DecodedNotam, line: string): DecodedNotam => {
  if (notam.metadata.parsedA) {
    return notam;
  }
  const regex = /(NOTAMN|NOTAMR|NOTAMC)/;
  const matches = line.match(regex);

  if (matches) {
    const text = line.split(' ');

    let code = text[0];
    if (code[0] === '(') {
      code = code.slice(1);
    }

    let type: NotamType;
    let affected: string | undefined;

    switch (matches[1]) {
      case 'NOTAMN':
        type = 'new';
        break;
      case 'NOTAMC':
        type = 'cancel';
        affected = text[2];
        break;
      case 'NOTAMR':
        type = 'replace';
        affected = text[2];
        break;
      default:
        type = 'new';
    }

    return {
      ...notam,
      notam: {
        code,
        type,
        affected,
      },
    };
  }
  return notam;
};

export default reducer;
