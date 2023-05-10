import { timer } from '@/core/entities';
import { startTimer } from './start-timer';

describe('startTimer()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resets seconds elapsed', () => {
    startTimer();
    expect(timer.getSecondsElapsed()).toBe(0);
  });

  it('increments seconds elapsed', () => {
    startTimer();
    vi.advanceTimersToNextTimer();
    expect(timer.getSecondsElapsed()).toBe(1);
  });

  it('triggers callback', () => {
    const callback = vi.fn();
    timer.registerCallback(callback);
    startTimer();
    vi.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalled();
  });
});
