import { Originator, MemberEventMetadata } from '../types';

const name = 'member-mentor-checkedin';

export type MemberMentorCheckedinEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
    callsign: string;
    ratingLimit: string;
  };
};

export type MemberMentorCheckedinEvent = MemberEventMetadata &
  MemberMentorCheckedinEventData;
