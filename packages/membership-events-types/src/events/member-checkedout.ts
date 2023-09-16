import { Originator, MemberEventMetadata } from '../types';

const name = 'member-checkedout';

export type MemberCheckedoutEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
  };
};

export type MemberCheckedoutEvent = MemberEventMetadata &
  MemberCheckedoutEventData;
