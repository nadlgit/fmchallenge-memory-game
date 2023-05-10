import { timer } from '@/core/entities';

export const onTimerUpdate = (callback: (secondsElapsed: number) => void) =>
  timer.registerCallback(callback);
