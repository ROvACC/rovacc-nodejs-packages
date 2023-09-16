import { Originator, MemberEventMetadata } from '../types';

const name = 'member-rating-updated';

export type MemberRatingUpdatedEventData = {
  memberId: string;
  name: typeof name;
  payload: {
    originator: Originator;
    rating: string;
  };
};

export type MemberRatingUpdatedEvent = MemberEventMetadata &
  MemberRatingUpdatedEventData;
