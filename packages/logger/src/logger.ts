/* eslint-disable max-len */
import {getColor} from './color-manager';
import {DEV_MODE, NODE_MODE} from './core';

let globalIndex = 0;

export class GecutLogger {
  constructor(domain: string, devMode = DEV_MODE) {
    this.domain = GecutLogger.stabilizeDomain(domain);
    this.devMode = devMode;
    this.style = GecutLogger.style.scope.replaceAll('{{color}}', getColor());

    this.index = ++globalIndex;

    this.initial();

    if (DEV_MODE) {
      this.initialDevelopments();
    }
  }

  private static keySection = NODE_MODE ? '%s%s%s%s%s' : '%c%s%c%s%c';
  private static style = {
    scope: NODE_MODE ? '\x1b[{{color}}m' : 'color: {{color}};',
    reset: NODE_MODE ? '\x1b[0m' : 'color: inherit;',
    dim: NODE_MODE ? '\x1b[2m' : 'color:#888;',
  };

  index: number;
  domain: string;
  devMode: boolean;
  style: string;

  property?: (property: string, value: unknown) => void;
  method?: (method: string) => void;
  methodArgs?: (method: string, args: unknown) => void;
  methodFull?: (method: string, args: unknown, result: unknown) => void;
  other?: (...args: unknown[]) => void;

  warning!: (method: string, code: string, desc: string, ...args: unknown[]) => void;
  error!: (method: string, code: string, ...args: unknown[]) => void;

  time?: (label: string) => void;
  timeEnd?: (label: string) => void;

  sub(domain: string, _devMode = this.devMode) {
    return new GecutLogger(`${this.domain} ⬅️ ${domain}`, _devMode);
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
    this.error = NODE_MODE
      ? console.error.bind(
        console,
          `${GecutLogger.style.dim}[${this.index}] ${this.style}❌ \n%s\x1b[31m.%s() Error \`%s\`${GecutLogger.style.reset}\n`,
          this.domain,
      )
      : console.error.bind(console, '%c%s%c.%s() Error `%s`\n', this.style, this.domain, GecutLogger.style.reset);

    this.warning = NODE_MODE
      ? console.warn.bind(
        console,
          `${GecutLogger.style.dim}[${this.index}] ${this.style}⚠️ \n%s\x1b[33m.%s() Accident \`%s\` %s!${GecutLogger.style.reset}`,
          this.domain,
      )
      : console.warn.bind(console, '%c%s%c.%s() Warn `%s` %s!', this.style, this.domain, GecutLogger.style.reset);
  }

  private initialDevelopments() {
    this.time = (label: string) => console.time(`[${this.index}] ${this.domain} ${label} duration`);

    this.timeEnd = (label: string) => console.timeEnd(`[${this.index}] ${this.domain} ${label} duration`);

    this.property = console.debug.bind(
      console,
      `${GecutLogger.keySection}.%s = %o;`,
      GecutLogger.style.dim,
      `[${this.index}] `,
      this.style,
      this.domain,
      GecutLogger.style.reset,
    );

    this.method = console.debug.bind(
      console,
      `${GecutLogger.keySection}.%s();`,
      GecutLogger.style.dim,
      `[${this.index}] `,
      this.style,
      this.domain,
      GecutLogger.style.reset,
    );

    this.methodArgs = console.debug.bind(
      console,
      `${GecutLogger.keySection}.%s(%o);`,
      GecutLogger.style.dim,
      `[${this.index}] `,
      this.style,
      this.domain,
      GecutLogger.style.reset,
    );

    this.methodFull = console.debug.bind(
      console,
      `${GecutLogger.keySection}.%s(%o) => %o`,
      GecutLogger.style.dim,
      `[${this.index}] `,
      this.style,
      this.domain,
      GecutLogger.style.reset,
    );

    this.other = console.debug.bind(
      console,
      GecutLogger.keySection,
      GecutLogger.style.dim,
      `[${this.index}] `,
      this.style,
      this.domain,
      GecutLogger.style.reset,
    );
  }
}
