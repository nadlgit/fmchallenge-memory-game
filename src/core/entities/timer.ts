import { CallbackHandler } from './callback-handler';

const callbackHandler = new CallbackHandler<number>();
let startTime = new Date();
let intervalId: ReturnType<typeof setInterval>;
let secondsElapsed = 0;

export const timer = {
  start: () => {
    startTime = new Date();
    secondsElapsed = 0;
    intervalId = setInterval(() => {
      secondsElapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
      timer.notifySecondsElapsed();
    }, 1000);
  },

  stop: () => {
    clearInterval(intervalId);
  },

  registerCallback: (callback: (secondsElapsed: number) => void) =>
    callbackHandler.registerCallback(callback),

  getSecondsElapsed: () => secondsElapsed,

  notifySecondsElapsed: () => {
    callbackHandler.notifyState(secondsElapsed);
  },
};
