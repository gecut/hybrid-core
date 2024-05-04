import {GecutQueue} from '@gecut/utilities/queue.js';
import {untilEvent, untilMS} from '@gecut/utilities/wait/wait.js';

const queue = new GecutQueue('demo', 1500);

const f1 = queue.push(untilMS(5000), 'f1');
const f2 = queue.push(untilEvent(document.body, 'dblclick'), 'f2');
let timer = 0;

setInterval(() => {
  console.clear();

  console.log(timer);

  console.log({
    id: f1.id,
    isRunning: queue.isRunning(f1.id),
    isFinished: queue.isFinished(f1.id),
    value: queue.getValue(f1.id),
  });

  console.log({
    id: f2.id,
    isRunning: queue.isRunning(f2.id),
    isFinished: queue.isFinished(f2.id),
    value: queue.getValue(f2.id),
  });

  timer++;
}, 1000);
