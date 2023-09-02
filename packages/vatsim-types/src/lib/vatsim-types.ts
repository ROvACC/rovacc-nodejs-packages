interface Rating {
  rating: number;
  code: string;
  humanReadable: string;
}
export interface User {
  id: string;
  rating: Rating;
  pilotRating: Rating;
  militaryRating: Rating;
  suspDate: Date;
  regDate: Date;
  region: string;
  division: string;
  subdivision: string;
  lastRatingChange: Date;
}
