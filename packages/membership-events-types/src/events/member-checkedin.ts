import { Originator, MemberEventMetadata } from '../types';

const name = 'member-checkedin';

export type MemberCheckedinEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
  };
};

export type MemberCheckedinEvent = MemberEventMetadata &
  MemberCheckedinEventData;
