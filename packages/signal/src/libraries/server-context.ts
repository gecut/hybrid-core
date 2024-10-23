import ky, {KyInstance, Options} from 'ky';

import {ContextSignal} from './context.js';

export class ServerContext<
  T extends Record<string, unknown>,
  R extends Record<keyof T, {path: string} & Options> = Record<keyof T, {path: string} & Options>,
> extends ContextSignal<T> {
  constructor(
    name: string,
    protected options: Options,
    protected routes: R,
  ) {
    super(name, 'IdleCallback');

    this.fetcher = ky.extend(options);
  }

  protected fetcher: KyInstance;

  async request<N extends keyof R & keyof T>(name: N, options?: Options): Promise<T[N]> {
    const data = await ky
      .get<T[N]>(this.routes[name].path, Object.assign(this.options, this.routes[name], options))
      .json();

    if (this.value) {
      this.value = {
        ...this.value,

        [name]: data,
      };
    }

    return data;
  }
}

const x = new ServerContext<{users: {name: string}; products: {title: string}}>(
  'server',
  {
    prefixUrl: '',
  },
  {
    users: {
      path: '/users',
    },
    products: {
      path: '/products',
    },
  },
);

x.request('products', {});
