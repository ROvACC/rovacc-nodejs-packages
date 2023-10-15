# NOTAM DECODER

This is a general purpose NOTAM Decoder.

## Usage

```javascript
const string = `(A4965/23 NOTAMN
Q) LRBB/QMRLC/IV/NBO/A /000/999/4434N02605E005
A) LROP B) 2310160700 C) 2310161100
E) RWY 08R/26L CLSD)`;

const notam = parse(string);
```
