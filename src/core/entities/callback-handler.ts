export class CallbackHandler<T> {
  #callbacks: Record<number, (state: T) => void> = {};
  #nextCallbackId = 0;

  registerCallback(callback: (state: T) => void) {
    this.#nextCallbackId++;
    const callbackId = this.#nextCallbackId;
    this.#callbacks[callbackId] = callback;
    return () => {
      delete this.#callbacks[callbackId];
    };
  }

  notifyState(state: T) {
    for (const callback of Object.values(this.#callbacks)) {
      callback(state);
    }
  }
}
