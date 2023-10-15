import { ScopeType } from '../../../types';

export const extractScope = (stringScope: string): ScopeType | undefined => {
  switch (stringScope) {
    case 'A':
      return 'Airport warning';
    case 'E':
      return 'Enroute warning';
    case 'W':
      return 'Navigation warning';
    case 'K':
      return 'Checklist';
    case 'AE':
      return 'Airport/Enroute warning';
    case 'AW':
      return 'Airport/Navigation warning';
  }
  return undefined;
};
