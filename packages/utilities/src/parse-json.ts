export function parseJson<T>(str: string): T | null {
  try {
    return JSON.parse(str) as T;
  } catch (err) {
    console.error(err);
    return null;
  }
}
