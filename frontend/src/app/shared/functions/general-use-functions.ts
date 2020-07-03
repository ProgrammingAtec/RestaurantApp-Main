export function isObjectEmpty(targetObject): boolean {
  for (const property in targetObject) {
    return false;
  }

  return true;
}
