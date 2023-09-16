import { Originator, MemberEventMetadata } from '../types';

const name = 'member-staff-checkedout';

export type MemberStaffCheckedoutEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
  };
};

export type MemberStaffCheckedoutEvent = MemberEventMetadata &
  MemberStaffCheckedoutEventData;
