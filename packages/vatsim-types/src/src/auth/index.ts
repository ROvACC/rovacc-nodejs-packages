export type VatsimConnectUserResponse = {
  data: Data;
};

export type Data = {
  cid: string;
  personal: Personal;
  vatsim: Vatsim;
  oauth: Oauth;
};

export type Personal = {
  name_first: string;
  name_last: string;
  name_full: string;
  email: string;
  country: Country;
};

export type Country = {
  id: string;
  name: string;
};

export type Vatsim = {
  rating: Rating;
  pilotrating: Pilotrating;
  division: Division;
  region: Region;
  subdivision: Subdivision;
};

export type Rating = {
  id: number;
  long: string;
  short: string;
};

export type Pilotrating = {
  id: number;
  long: string;
  short: string;
};

export type Division = {
  id: string | null;
  name: string | null;
};

export type Region = {
  id: string | null;
  name: string | null;
};

export type Subdivision = {
  id: string | null;
  name: string | null;
};

export type Oauth = {
  token_valid: string;
};
