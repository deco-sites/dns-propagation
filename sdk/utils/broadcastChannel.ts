// deno-lint-ignore-file no-explicit-any
/**
 * Used as a stub to call broadcast channel, when running on DenoDeploy the native broadcastchannel will be used, otherwise (localhost, generally) a simple implementation will be used instead.
 */
export interface BroadcastChannelImpl {
  postMessage(message: any): void;
  close(): void;
  addEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (ev: EventSourceEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
}

const subscribers: Record<
  string,
  Record<string, (ev: EventSourceEventMap[keyof EventSourceEventMap]) => any>
> = {};
export const newBroadcastChannel = (
  channelId: string,
): BroadcastChannelImpl => {
  const instance = crypto.randomUUID();
  try {
    return new BroadcastChannel(channelId);
  } catch {
    subscribers[channelId] ??= {};
    return {
      addEventListener: <K extends keyof EventSourceEventMap>(
        _type: K,
        listener: (ev: EventSourceEventMap[K]) => any,
        _options?: boolean | AddEventListenerOptions,
      ) => {
        subscribers[channelId][instance] = listener as (
          ev: EventSourceEventMap[keyof EventSourceEventMap],
        ) => any;
      },
      close: () => {
        delete subscribers[channelId][instance];
      },
      postMessage: (message: any) => {
        for (const subscriber of Object.values(subscribers[channelId])) {
          subscriber({ data: message } as any);
        }
      },
    };
  }
};
