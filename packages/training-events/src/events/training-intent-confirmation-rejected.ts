import {
  Reducer,
  Training,
  TrainingIntentConfirmationRejectedEvent,
} from '@rovacc/training-events-types';

const name = 'training-intent-confirmation-rejected';

const reducer: Reducer<TrainingIntentConfirmationRejectedEvent> = (
  training: Training | null,
  event: TrainingIntentConfirmationRejectedEvent
): Training => ({
  ...training,
  status: 'QUEUED',
  trainingId: event.trainingId,
  intentConfirmation: {
    ...training?.intentConfirmation,
    rejectedAt: event.emittedAt,
  },
});

const isEmitted = (training: Training | null) =>
  training &&
  training?.intentConfirmation &&
  training.intentConfirmation.rejectedAt;

export const trainingIntentConfirmationRejected = {
  name,
  reducer,
  isEmitted,
} as const;
