import {GecutLogger} from '@gecut/logger';

const logger = new GecutLogger('main', true);

logger.error('test', 'error_working', 'fuck1', 'fuck2', {object: 'test'}, ['test', 'test']);
logger.warning('test', 'warning_working', 'warning description', 'fuck1', 'fuck2', {object: 'test'}, ['test', 'test']);

logger.method?.('test');
logger.methodArgs?.('test', {test: 'test'});
logger.methodFull?.('test', {args: 'test'}, 'fuck');

logger.property?.('property', 'fuck');
logger.other?.('other', 'warning description', 'fuck1', 'fuck2', {object: 'test'}, ['test', 'test']);

logger.time?.('test');
logger.timeEnd?.('test');

const subLogger = logger.sub('sub');

subLogger.error('test', 'error_working', 'fuck1', 'fuck2', {object: 'test'}, ['test', 'test']);
subLogger.warning('test', 'warning_working', 'warning description', 'fuck1', 'fuck2', {object: 'test'}, [
  'test',
  'test',
]);

subLogger.method?.('test');
subLogger.methodArgs?.('test', {test: 'test'});
subLogger.methodFull?.('test', {args: 'test'}, 'fuck');

subLogger.property?.('property', 'fuck');
subLogger.other?.('other', 'warning description', 'fuck1', 'fuck2', {object: 'test'}, ['test', 'test']);

subLogger.time?.('test');
subLogger.timeEnd?.('test');
