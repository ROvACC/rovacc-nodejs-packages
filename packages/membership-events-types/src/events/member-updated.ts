import { Originator, MemberEventMetadata } from '../types';

const name = 'member-updated';

export type MemberUpdatedEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
};

export type MemberUpdatedEvent = MemberEventMetadata & MemberUpdatedEventData;
