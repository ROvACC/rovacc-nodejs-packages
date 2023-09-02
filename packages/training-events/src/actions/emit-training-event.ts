import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../helpers/get-date';
import { isEmitted, reduceEvent } from '../events';
import { DataInput, MetadataInput } from './types';
import { Training, TrainingEvent } from '@rovacc/training-events-types';

export const emitTrainingEvent = async (
  data: DataInput,
  metadata: MetadataInput
): Promise<Training | null> => {
  const { eventData, training, correlationId } = data;
  const { firestore, collection, systemId, subcollection } = metadata;

  const trainingId = eventData.trainingId;
  const event: TrainingEvent = {
    eventId: uuidv4(),
    emittedAt: getDate(),
    system: systemId,
    correlationId,
    ...eventData,
  };

  if (isEmitted[event.name] && isEmitted[event.name](training, event)) {
    return training;
  }

  const trainingCollection = firestore.collection(collection);

  const trainingObj = await trainingCollection.doc(trainingId).get();
  if (!trainingObj.exists) {
    await trainingCollection.doc(trainingId).set({ trainingId });
  }

  await trainingCollection
    .doc(trainingId)
    .collection(subcollection)
    .doc(event.eventId)
    .set(event);

  return reduceEvent(training, event);
};
