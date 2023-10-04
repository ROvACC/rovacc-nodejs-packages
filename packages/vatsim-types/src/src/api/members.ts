export type VatsimRegion = 'AMAS' | 'APAC' | 'EMEA';

export interface VatsimUser {
  id: string;
  rating: VatsimRating;
  pilotRating: VatsimRating;
  militaryRating: VatsimRating;
  suspDate: Date;
  regDate: Date;
  region: VatsimRegion;
  division: string;
  subdivision: string;
  lastRatingChange: Date;
}

export interface VatsimRating {
  rating: number;
  code: string;
  humanReadable: string;
}
