import { convertDec } from './convert-dec';

export const extractLatLong = (
  strLat: string,
  posLat: string,
  strLon: string,
  posLon: string
): [number, number] => {
  let latitude = convertDec(strLat, 'latitude');
  if (posLat === 'S') {
    latitude = -latitude;
  }
  let longitude = convertDec(strLon, 'longitude');
  if (posLon === 'W') {
    longitude = -longitude;
  }
  return [latitude, longitude];
};
