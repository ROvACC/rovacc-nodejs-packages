import { Originator, MemberEventMetadata } from '../types';

const name = 'member-staff-checkedin';

export type MemberStaffCheckedinEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
    callsign: string;
    position: string;
  };
};

export type MemberStaffCheckedinEvent = MemberEventMetadata &
  MemberStaffCheckedinEventData;
