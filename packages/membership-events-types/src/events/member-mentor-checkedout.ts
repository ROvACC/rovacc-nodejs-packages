import { Originator, MemberEventMetadata } from '../types';

const name = 'member-mentor-checkedout';

export type MemberMentorCheckedoutEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
  };
};

export type MemberMentorCheckedoutEvent = MemberEventMetadata &
  MemberMentorCheckedoutEventData;
