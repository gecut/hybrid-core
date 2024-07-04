/* eslint-disable max-len */
import {getColor} from './color-manager';
import {DEV_MODE, NODE_MODE} from './core';

export class GecutLogger {
  private static readonly style = {
    scope: NODE_MODE ? '\x1b[{{color}}m' : 'color: {{color}};',
    reset: NODE_MODE ? '\x1b[0m' : 'color: inherit;',
    dim: NODE_MODE ? '\x1b[2m' : 'color:#888;',
  };
  private static indexCounter = 0;

  private readonly domain: string;
  private readonly devMode: boolean;
  private readonly styleString: string;
  private readonly index: number;

  property?: (property: string, value: unknown) => void;
  method?: (method: string) => void;
  methodArgs?: (method: string, args: unknown) => void;
  methodFull?: (method: string, args: unknown, result: unknown) => void;
  other?: (...args: unknown[]) => void;

  warning!: (method: string, code: string, desc: string, ...args: unknown[]) => void;
  error!: (method: string, code: string, ...args: unknown[]) => void;

  time?: (label: string) => void;
  timeEnd?: (label: string) => void;

  constructor(domain: string, devMode = DEV_MODE) {
    this.domain = GecutLogger.stabilizeDomain(domain);
    this.devMode = devMode;
    this.styleString = GecutLogger.style.scope.replace('{{color}}', getColor());
    this.index = GecutLogger.getIndex();

    this.initial();

    if (this.devMode) {
      this.initialDevelopments();
    }
  }

  private static getIndex(): number {
    return this.indexCounter++;
  }

  private static stabilizeDomain(domain: string): string {
    domain = domain.trim();

    const first = domain.charAt(0);

    if (first !== '[' && first !== '{' && first !== '<') {
      domain = `[${domain}]`;
    }

    return domain;
  }

  private initial() {
    this.error = this.createLogger(
      'error',
      `${GecutLogger.style.dim}[${this.index}] ${this.styleString}❌ %s.%s() Error ' %s'\n`,
      this.domain,
    );
    this.warning = this.createLogger(
      'warn',
      `${GecutLogger.style.dim}[${this.index}] ${this.styleString}⚠️ %s.%s() Accident ' %s' %s!\n`,
      this.domain,
    );
  }

  private initialDevelopments() {
    this.time = (label: string) => console.time(`[${this.index}] ${this.domain} ${label} duration`);
    this.timeEnd = (label: string) => console.timeEnd(`[${this.index}] ${this.domain} ${label} duration`);

    this.property = this.createLogger('debug', `${GecutLogger.style.dim}.%s = %o;\n`, this.domain);
    this.method = this.createLogger('debug', `${GecutLogger.style.dim}.%s();\n`, this.domain);
    this.methodArgs = this.createLogger('debug', `${GecutLogger.style.dim}.%s(%o);\n`, this.domain);
    this.methodFull = this.createLogger('debug', `${GecutLogger.style.dim}.%s(%o) => %o\n`, this.domain);
    this.other = this.createLogger('debug', GecutLogger.style.dim + '%s %o\n', this.domain);
  }

  private createLogger(
    level: 'error' | 'warn' | 'debug',
    format: string,
    ...args: unknown[]
  ): (...args: unknown[]) => void {
    return console[level].bind(console, format, ...args);
  }

  sub(domain: string, _devMode = this.devMode): GecutLogger {
    return new GecutLogger(`${this.domain} ⬅ ${domain}`, _devMode);
  }
}
