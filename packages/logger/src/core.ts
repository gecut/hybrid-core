import {isNode} from '@gecut/utilities/browser-or-node.js';
import {env} from '@gecut/utilities/env.js';

export const NODE_MODE = isNode();

export const DEV_MODE =
  (NODE_MODE === false ? (localStorage?.getItem('DEBUG') ?? '0') : env('DEBUG', '0', 'string')) === '1';
