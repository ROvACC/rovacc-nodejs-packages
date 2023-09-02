import { Training, TrainingEventData } from '@rovacc/training-events-types';

export type DataInput = {
  eventData: TrainingEventData;
  training: Training | null;
  correlationId: string;
};

export type MetadataInput = {
  firestore: FirebaseFirestore.Firestore;
  collection: string;
  subcollection: string;
  systemId: string;
};
