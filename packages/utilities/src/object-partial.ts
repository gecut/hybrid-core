import type {ObjectBooleanize, ObjectPartial} from '@gecut/types';

export default function objectPartial<T extends Record<string, unknown>, K extends ObjectBooleanize<T, true>>(
  _object: T,
  options: K,
): ObjectPartial<T, K> {
  for (const key of Object.keys(_object)) {
    if (typeof _object[key] === 'object' && _object[key] != null && options[key] != null) {
      _object[key as unknown as keyof T] = objectPartial(
        _object[key as unknown as keyof T] as never,
        options[key] as never,
      );
    }
    else if (options[key] !== true && key in _object) delete _object[key];
  }

  return _object as ObjectPartial<T, K>;
}
