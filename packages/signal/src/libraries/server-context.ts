import ky, {KyInstance, Options} from 'ky';

import {ContextSignal} from './context.js';
import {GecutState} from './state.js';

export class ServerContext<
  T extends Record<string, unknown>,
  R extends Record<keyof T, {path: string} & Options> = Record<keyof T, {path: string} & Options>,
> extends ContextSignal<T> {
  constructor(
    public name: string,
    protected options: Options,
    protected routes: R,
    protected defaultValue: T,
    protected initializers: (keyof T)[] = [],
  ) {
    super(name, 'IdleCallback');

    this.fetcher = ky.extend(options);
    this.loader.value = 0;

    this.options = {
      cache: 'force-cache',
      ...this.options,
    };

    Promise.all(initializers.map((key) => this.request(key, {keepalive: true, cache: 'reload'})));
  }

  protected fetcher: KyInstance;

  loader = new GecutState<number>(this.name, 'AnimationFrame');

  async request<N extends keyof R & keyof T>(name: N, options?: Options): Promise<T[N]> {
    this.loader.value!++;

    const data = await ky
      .get<T[N]>(this.routes[name].path, Object.assign(this.options, this.routes[name], options))
      .json();

    this.loader.value!--;

    if (this.value) {
      this.value = {
        ...this.value,

        [name]: data,
      };
    }

    return data;
  }

  override get value(): T {
    return super.value!;
  }
  override set value(value: T) {
    super.value = value;
  }
}
