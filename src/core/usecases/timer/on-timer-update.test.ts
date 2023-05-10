import { timer } from '@/core/entities';
import { onTimerUpdate } from './on-timer-update';

describe('onTimerUpdate()', () => {
  it('registers callback', () => {
    const callback = vi.fn();
    onTimerUpdate(callback);
    timer.notifySecondsElapsed();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(timer.getSecondsElapsed());
  });

  it('returns unregister function', () => {
    const callback = vi.fn();
    const unregister = onTimerUpdate(callback);
    unregister();
    timer.notifySecondsElapsed();
    expect(callback).not.toHaveBeenCalled();
  });
});
