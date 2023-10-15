import { DecodedNotam } from '../../../types';

export const extractAttention = (
  stringAttention: string
): DecodedNotam['attention'] => {
  const notamAttention: DecodedNotam['attention'] = [];
  const attentions = Array.from(stringAttention);

  for (const attention of attentions) {
    switch (attention) {
      case 'N':
        notamAttention.push('Immediate attention');
        break;
      case 'B':
        notamAttention.push('Operational significance');
        break;
      case 'O':
        notamAttention.push('Flight operations');
        break;
      case 'M':
        notamAttention.push('Misc');
        break;
      case 'K':
        notamAttention.push('Checklist');
        break;
    }
  }
  return notamAttention;
};
