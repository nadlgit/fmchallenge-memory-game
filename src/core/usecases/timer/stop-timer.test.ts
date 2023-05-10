import { timer } from '@/core/entities';
import { stopTimer } from './stop-timer';

describe('stopTimer()', () => {
  it('stops incrementation', () => {
    vi.useFakeTimers();
    timer.start();
    vi.advanceTimersToNextTimer();
    stopTimer();
    vi.advanceTimersToNextTimer();
    expect(timer.getSecondsElapsed()).toBe(1);
    vi.useRealTimers();
  });
});
