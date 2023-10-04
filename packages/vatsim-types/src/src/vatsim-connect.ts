export interface VatsimConnectUserResponse {
  data: Data;
}

export interface Data {
  cid: string;
  personal: Personal;
  vatsim: Vatsim;
  oauth: Oauth;
}

export interface Personal {
  name_first: string;
  name_last: string;
  name_full: string;
  email: string;
  country: Country;
}

export interface Country {
  id: string;
  name: string;
}

export interface Vatsim {
  rating: Rating;
  pilotrating: Pilotrating;
  division: Division;
  region: Region;
  subdivision: Subdivision;
}

export interface Rating {
  id: number;
  long: string;
  short: string;
}

export interface Pilotrating {
  id: number;
  long: string;
  short: string;
}

export interface Division {
  id: string | null;
  name: string | null;
}

export interface Region {
  id: string | null;
  name: string | null;
}

export interface Subdivision {
  id: string | null;
  name: string | null;
}

export interface Oauth {
  token_valid: string;
}
