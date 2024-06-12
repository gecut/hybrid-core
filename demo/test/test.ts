import {GecutEnvVM} from '@gecut/utilities/envvm.js';

const envVM = new GecutEnvVM('demo', {
  time: Date.now(),
  userToken: 'ooooo',
});

console.log(envVM.get('time'));
console.log(envVM.get('userToken'));

setInterval(() => {
  envVM.set('time', Date.now());
  envVM.set('userToken', (old) => old + '0');

  console.clear();
  console.log('time', new Date(envVM.get('time')).toLocaleTimeString());
  console.log('userToken', envVM.get('userToken'));
}, 500);
