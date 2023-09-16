export type Originator = 'vatsim' | 'rovacc';

export type MemberEventMetadata = {
  eventId: string;
  emittedAt: Date;
  system: string;
  correlationId: string;
};

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  division: string;
  subsivision: string;
  rating: string;
  pilotRating: string;
  registeredAt: Date;
  suspendedAt?: Date;
  inactivatedAt?: Date;
  checkedInAt?: Date;
  checkedOutAt?: Date;
  lastRatingChange?: Date;
  mentor?: {
    callsign: string;
    ratingLimit: string;
  };
  staff?: {
    callsign: string;
    position: string;
  };
};
