import { CallbackHandler } from './callback-handler';

describe('CallbackHandler', () => {
  it('registers multiple callbacks', () => {
    const handler = new CallbackHandler<void>();
    const callback1 = vi.fn();
    handler.registerCallback(callback1);
    const callback2 = vi.fn();
    handler.registerCallback(callback2);
    handler.notifyState();
    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  it('unregisters callback', () => {
    const handler = new CallbackHandler<void>();
    const callback1 = vi.fn();
    const unregister1 = handler.registerCallback(callback1);
    const callback2 = vi.fn();
    handler.registerCallback(callback2);
    unregister1();
    handler.notifyState();
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  it('notifies callbacks', () => {
    const state = 1;
    const handler = new CallbackHandler<typeof state>();
    const callback = vi.fn();
    handler.registerCallback(callback);
    handler.notifyState(state);
    expect(callback).toHaveBeenCalledWith(state);
  });
});
