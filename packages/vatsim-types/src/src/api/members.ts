type DiscordNicknameFormat = 'CID' | 'FIRST_NAME_CID' | 'FULL_NAME_CID';

export type RovaccMember = {
  id: string;
  cid: string;
  email: string;
  country: string;
  name: string;

  discord: {
    id: string | null;
    format: DiscordNicknameFormat | null;
  };
  rating: number;
  pilotRating: number;
  militaryRating: number;

  suspensionDate: Date | null;
  registrationDate: Date;

  region: string | null;
  division: string | null;
  subdivision: string | null;

  lastRatingChange: Date;
};
