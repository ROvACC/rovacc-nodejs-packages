export const convertDec = (
  dms: string,
  latlong: 'latitude' | 'longitude'
): number => {
  let deg: string;
  let min: string;

  if (latlong === 'latitude') {
    deg = dms.substring(0, 2);
    min = dms.substring(2, 4);
  } else {
    deg = dms.substring(0, 3);
    min = dms.substring(3, 5);
  }

  return parseFloat(deg) + (parseFloat(min) * 60) / 3600;
};
