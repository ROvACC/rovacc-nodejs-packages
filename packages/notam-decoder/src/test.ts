import { decode } from './parse';

const notam = `(A4966/23 NOTAMN
Q) LRBB/QMRLC/IV/NBO/A /000/999/4434N02605E005
A) LROP B) 2310170600 C) 2310171000
E) RWY 08R/26L CLSD)`;
decode(notam);
