import type {ArrowFunction} from '@gecut/types';

export type StateManager<STATE_KEYS extends string = string, STATE_FUNC_RETURN = unknown> = Record<
  STATE_KEYS,
  ArrowFunction<STATE_FUNC_RETURN>
>;

export function stateManager<T extends StateManager, S extends keyof T>(states: T, state: S): ReturnType<T[S]> {
  return states[state]() as ReturnType<T[S]>;
}
