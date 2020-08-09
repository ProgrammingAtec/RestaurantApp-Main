export function objectNotEmpty(targetObject): boolean {
  for (const property in targetObject) {
    if (targetObject.hasOwnProperty(property)) return true;
  }

  return false;
}
