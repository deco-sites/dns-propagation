import { IS_BROWSER } from "$fresh/runtime.ts";
import { effect, Signal, signal } from "@preact/signals";
import type { JSX } from "preact";

export const locallyPersistedSignal = <T>(
  key: string,
  initialValue: T,
) => {
  const signalInitialValue = IS_BROWSER
    ? JSON.parse(window.localStorage?.getItem(key) ?? "null") ?? initialValue
    : initialValue;

  const _signal = signal<T>(signalInitialValue);

  effect(() => {
    if (!_signal.value) {
      return;
    }

    IS_BROWSER &&
      window.localStorage?.setItem(key, JSON.stringify(_signal.value));
  });

  return _signal;
};

export const valueOf = <T>(signalOrValue: JSX.SignalLike<T> | T): T =>
  signalOrValue instanceof Signal ? signalOrValue.value : signalOrValue;
