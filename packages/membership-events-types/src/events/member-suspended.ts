import { Originator, MemberEventMetadata } from '../types';

const name = 'member-suspended';

export type MemberSuspendedEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
  };
};

export type MemberSuspendedEvent = MemberEventMetadata &
  MemberSuspendedEventData;
