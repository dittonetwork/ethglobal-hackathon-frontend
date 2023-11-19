import StorageKeys, { StorageKeyTypes } from "@/shared/keys/storage-keys"

export default function useStorage(storage = localStorage) {
  return {
    hasItem(key: StorageKeys) {
      return this.getItem(key) !== null
    },

    getItem<T extends StorageKeys>(key: T): StorageKeyTypes[T] | null {
      const content = storage.getItem(key)

      if (!content) return null

      try {
        return JSON.parse(content)
      } catch {
        return null
      }
    },

    forceGetItem<T extends StorageKeys>(key: T): StorageKeyTypes[T] {
      return this.getItem(key) as StorageKeyTypes[T]
    },

    setItem<T extends StorageKeys>(key: T, content: StorageKeyTypes[T]) {
      try {
        storage.setItem(key, JSON.stringify(content))
        return true
      } catch {
        return false
      }
    },

    addArrayItem<T extends StorageKeys>(key: T, content: ArrayElement<StorageKeyTypes[T]>) {
      const current = this.getItem(key)

      if (!Array.isArray(current)) return false

      if (!current) return this.setItem(key, [content] as any)

      return this.setItem(key, [...current, content] as any)
    },

    addObjectKey<T extends StorageKeys>(key: T, value: StorageKeyTypes[T]) {
      const current = this.getItem(key)

      if (!current) return this.setItem(key, value)

      return this.setItem(key, {
        ...current as Object,
        ...value as any
      })
    },

    deleteItem(key: StorageKeys) {
      storage.removeItem(key)

      return true
    }
  }
}