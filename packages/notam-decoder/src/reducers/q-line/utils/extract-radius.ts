export const extractRadius = (strRadius: string): number => {
  return strRadius !== '' ? parseInt(strRadius, 10) : 0;
};
