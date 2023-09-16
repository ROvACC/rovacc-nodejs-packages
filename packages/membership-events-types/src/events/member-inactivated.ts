import { Originator, MemberEventMetadata } from '../types';

const name = 'member-inactivated';

export type MemberInactivatedEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
  };
};

export type MemberInactivatedEvent = MemberEventMetadata &
  MemberInactivatedEventData;
