import { DependencyList, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

export enum HandlerStatus {
  IDLE = "IDLE",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCEEDED = "SUCCEEDED",
  ERROR = "ERROR"
}

/**
 * Hook to manages the status of an effect (async function).
 * The hook accepts an effect async function as argument and returns status, handler & error.
 * On calling handler, the effect will be called and status will be set to IN_PROGRESS.
 * If the async function completes the status would be set to SUCCEEDED else ERROR.
 * Status will be in IDLE state by default.
 */
export function useHandler(
  effect: () => Promise<any>,
  deps: DependencyList,
  catchError?: boolean
): {status: HandlerStatus, call: () => Promise<any>, error: Error | null};
export function useHandler<A>(
  effect: (args: A) => Promise<any>,
  deps: DependencyList,
  catchError?: boolean
): {status: HandlerStatus, call: (args: A) => Promise<any>, error: Error | null};
export function useHandler<A>(
  effect: (args?: A) => Promise<any>,
  deps: DependencyList,
  catchError?: boolean
): {status: HandlerStatus, call: () => Promise<any>, error: Error | null} |
    {status: HandlerStatus, call: (args: A) => Promise<any>, error: Error | null} {
  const [status, setStatus] = useState<HandlerStatus>(HandlerStatus.IDLE);
  const [error, setError] = useState<Error | null>(null);

  if(!catchError && error) {
    throw error;
  }

  const call = useCallback(async (args: A) => {
    setStatus(HandlerStatus.IN_PROGRESS);

    try {
      await effect(args);

      setStatus(HandlerStatus.SUCCEEDED);
    } catch (e: any) {
      console.error('Handler Hook : ', e);
      setStatus(HandlerStatus.ERROR);
      setError(e);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return useMemo(() => ({status, call, error}), [status, call, error]);
}

// TODO: Can we reduce the returned values, why not use deps = []
// Manages state & status of async function calls
export function useStateHandler<S>(
  initialState: S | (() => S),
  effect: () => Promise<S>,
  deps?: DependencyList,
  catchError?: boolean
): [S, {status: HandlerStatus, call: () => Promise<void>, error: Error | null}, Dispatch<SetStateAction<S>>];
export function useStateHandler<S, A>(
  initialState: S | (() => S),
  effect: (args: A) => Promise<S>,
  deps?: DependencyList,
  catchError?: boolean
): [S, {status: HandlerStatus, call: (args: A) => Promise<void>, error: Error | null}, Dispatch<SetStateAction<S>>];
export function useStateHandler<S, A = undefined>(
  initialState: S | (() => S),
  effect: (args?: A) => Promise<S>,
  deps?: DependencyList,
  catchError?: boolean
): [S, {status: HandlerStatus, call: (args?: A) => Promise<void>, error: Error | null}, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState);

  const loadHandler = useHandler<A | undefined>(
    async (args: A | undefined) => setState(await effect(args)),
    deps || [],
    catchError
  );

  /**
   * - effect not called automatically if deps is null, expected to be called manually with loadHandler.call
   * - State will be auto refreshed if any of the dependency change
   */
  useEffect(() => {
    if (deps) {
      loadHandler.call(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  return [state, loadHandler, setState];
}

// Observes a dependency and handle an effect on change
export function useObserveHandler(
  effect: () => Promise<void>,
  deps?: DependencyList,
  catchError?: boolean
): {status: HandlerStatus, call: () => Promise<void>, error: Error | null} {
  const handler = useHandler(effect, deps || [], catchError);

  // state will be auto refreshed if any of the dependency change
  useEffect(() => {
    if (deps) {
      handler.call();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  return handler;
}
