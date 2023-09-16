import { Originator, MemberEventMetadata } from '../types';

const name = 'member-reactivated';

export type MemberReactivatedEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
    rating: string;
  };
};

export type MemberReactivatedEvent = MemberEventMetadata &
  MemberReactivatedEventData;
