import { Training, TrainingEvent } from '@rovacc/training-events-types';
import { TrainingNotFound } from '../exception/training-not-found';
import { getDatabaseCollection } from '../helpers/database-client';
import { MetadataInput } from './types';

export const getTrainingEvents = async (
  trainingId: string,
  metadata: MetadataInput
): Promise<TrainingEvent[] | undefined> => {
  const { collection, subcollection } = metadata;
  const trainingCollection = getDatabaseCollection(collection);

  const trainingEvents = await trainingCollection
    .doc(trainingId)
    .collection(subcollection)
    .get();

  if (
    !trainingEvents ||
    !trainingEvents.docs ||
    trainingEvents.docs.length === 0
  ) {
    return undefined;
  }

  return trainingEvents.docs.map(
    (event: FirebaseFirestore.QueryDocumentSnapshot) =>
      event.data() as TrainingEvent
  );
};

export const tryGetTrainingEvents = async (
  trainingId: string,
  metadata: MetadataInput
): Promise<TrainingEvent[] | undefined> => {
  const trainingEvents = await getTrainingEvents(trainingId, metadata);
  if (!trainingEvents) {
    throw new TrainingNotFound(trainingId);
  }
  return trainingEvents;
};

export const getTraining = async (
  trainingId: string,
  metadata: MetadataInput
): Promise<Training | undefined> => {
  const trainingCollection = getDatabaseCollection(metadata.collection);

  const training = await trainingCollection.doc(trainingId).get();

  if (!training.exists) {
    return undefined;
  }

  return training.data() as Training;
};

export const tryGetTraining = async (
  trainingId: string,
  metadata: MetadataInput
): Promise<Training> => {
  const training = await getTraining(trainingId, metadata);
  if (!training) {
    throw new TrainingNotFound(trainingId);
  }
  return training;
};
