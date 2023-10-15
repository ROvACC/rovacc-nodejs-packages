import { DecodedNotam } from '../../../types';

export const extractRules = (stringRules: string): DecodedNotam['rules'] => {
  const notamRules: DecodedNotam['rules'] = [];
  const rules = Array.from(stringRules);

  for (const rule of rules) {
    switch (rule) {
      case 'I':
        notamRules.push('IFR');
        break;
      case 'V':
        notamRules.push('VFR');
        break;
      case 'K':
        notamRules.push('Checklist');
        break;
    }
  }
  return notamRules;
};
