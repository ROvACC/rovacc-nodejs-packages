export type AttentionType =
  | 'Immediate attention'
  | 'Operational significance'
  | 'Flight operations'
  | 'Misc'
  | 'Checklist';
export type RulesTypes = 'IFR' | 'VFR' | 'Checklist';

export type ScopeType =
  | 'Airport warning'
  | 'Enroute warning'
  | 'Navigation warning'
  | 'Checklist'
  | 'Airport/Enroute warning'
  | 'Airport/Navigation warning';
export type NotamType = 'new' | 'cancel' | 'replace';

export type DecodedNotam = {
  raw: string;
  text: string;
  notam: {
    code: string;
    type: NotamType;
    affected?: string;
  };
  fir: string;
  title: string;
  rules: Array<RulesTypes>;
  attention: Array<AttentionType>;
  scope?: ScopeType;
  code: string;
  duration: {
    permanent: boolean;
    estimated: boolean;
    dateBegin: Date;
    dateEnd?: Date;
  };
  position: {
    lowerLimit?: number;
    upperLimit?: number;
    latitude?: number;
    longitude?: number;
    radius?: number;
  };
  metadata: {
    parsedQ: boolean;
    parsedA: boolean;
    parsedB: boolean;
    parsedC: boolean;
    parsedE: boolean;
  };
};
