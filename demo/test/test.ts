import {GecutQueue} from '@gecut/utilities/queue.js';
import {untilMS} from '@gecut/utilities/wait/wait.js';

const queue = new GecutQueue('demo', 500);

queue.push(untilMS(5000), 'ms1');

console.log('fuck')
