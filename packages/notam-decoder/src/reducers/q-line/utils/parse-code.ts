import { airspace } from '../../../constants/airspace';
import { airtraffic } from '../../../constants/airtraffic';
import { availability } from '../../../constants/availability';
import { changes } from '../../../constants/changes';
import { comradar } from '../../../constants/comradar';
import { facilities } from '../../../constants/facilities';
import { hazardous } from '../../../constants/hazardous';
import { information } from '../../../constants/information';
import { instrumentlanding } from '../../../constants/instrumentlanding';
import { lightingfacilities } from '../../../constants/lightingfacilities';
import { limitations } from '../../../constants/limitations';
import { movementareas } from '../../../constants/movementareas';
import { navigationwarning } from '../../../constants/navigationwarning';
import { terminalfacilities } from '../../../constants/terminalfacilities';
import { volmet } from '../../../constants/volmet';
import { warnings } from '../../../constants/warnings';

export function parseCode(code: string): string {
  const codeArray = Array.from(code);
  const codeFp = codeArray[1] + codeArray[2];
  const codeSp = codeArray[3] + codeArray[4];
  let result = '';

  switch (code[1]) {
    case 'A':
      result = 'Airspace organization ';
      if (airspace[codeFp]) {
        result += airspace[codeFp];
      }
      break;
    case 'C':
      result = 'Communications and radar facilities ';
      if (comradar[codeFp]) {
        result += comradar[codeFp];
      }
      break;
    case 'F':
      result = 'Facilities and services ';
      if (facilities[codeFp]) {
        result += facilities[codeFp];
      }
      break;
    case 'I':
      result = 'Instrument and Microwave Landing System ';
      if (instrumentlanding[codeFp]) {
        result += instrumentlanding[codeFp];
      }
      break;
    case 'L':
      result = 'Lighting facilities ';
      if (lightingfacilities[codeFp]) {
        result += lightingfacilities[codeFp];
      }
      break;
    case 'M':
      result = 'Movement and landing areas ';
      if (movementareas[codeFp]) {
        result += movementareas[codeFp];
      }
      break;
    case 'N':
      result = 'Terminal and En Route Navigation Facilities ';
      if (terminalfacilities[codeFp]) {
        result += terminalfacilities[codeFp];
      }
      break;
    case 'O':
      result = 'Other information ';
      if (information[codeFp]) {
        result += information[codeFp];
      }
      break;
    case 'P':
      result = 'Air Traffic procedures ';
      if (airtraffic[codeFp]) {
        result += airtraffic[codeFp];
      }
      break;
    case 'R':
      result = 'Navigation Warnings: Airspace Restrictions ';
      if (navigationwarning[codeFp]) {
        result += navigationwarning[codeFp];
      }
      break;
    case 'S':
      result = 'Air Traffic and VOLMET Services ';
      if (volmet[codeFp]) {
        result += volmet[codeFp];
      }
      break;
    case 'W':
      result = 'Navigation Warnings: Warnings ';
      if (warnings[codeFp]) {
        result += warnings[codeFp];
      }
      break;
  }

  switch (code[3]) {
    case 'A':
      if (availability[codeSp]) {
        result += ' ' + availability[codeSp];
      }
      break;
    case 'C':
      if (changes[codeSp]) {
        result += ' ' + changes[codeSp];
      }
      break;
    case 'H':
      if (hazardous[codeSp]) {
        result += ' ' + hazardous[codeSp];
      }
      break;
    case 'L':
      if (limitations[codeSp]) {
        result += ' ' + limitations[codeSp];
      }
      break;
    case 'X':
      // Other Information
      break;
  }
  return result.trim();
}
