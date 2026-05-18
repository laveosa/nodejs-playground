export function removeModelDuplicate<T extends Record<string, any>>(
  collection: T[],
  ignoreKeys: string[] = [],
): T[] {
  const uniqueMap = new Map<string, T>();

  for (const item of collection) {
    const relevantEntries = Object.entries(item)
      .filter(([key]: [string, any]) => !ignoreKeys.includes(key))
      .sort(([keyA]: [string, any], [keyB]: [string, any]) =>
        keyA.localeCompare(keyB),
      );

    const compositeKey = relevantEntries
      .map(([key, val]) => `${key}:${String(val).toLowerCase().trim()}`)
      .join("|");

    if (!uniqueMap.has(compositeKey)) {
      uniqueMap.set(compositeKey, item);
    }
  }

  return Array.from(uniqueMap.values());
}
