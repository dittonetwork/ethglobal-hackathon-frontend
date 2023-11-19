const storeInstances = new Map<string, any>()

export default function useStore<T>(store: new () => T) {
  if (storeInstances.has(String(store))) {
    return storeInstances.get(String(store)) as T
  }

  const instance = new store()
  storeInstances.set(String(store), instance)
  return instance
}