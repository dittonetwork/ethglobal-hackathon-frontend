import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"

export interface StateOverride<T> {
  value: T
  setValue: ((value: T) => any)
}

export default function useOverridableState<T>(defaultValue: T, override?: StateOverride<T>) {
  const [_value, _setValue] = useState<T>(defaultValue)

  const value = useMemo(() => override ? override.value : _value, [
    override?.value,
    _value
  ])

  const setValue = useCallback((value: T | ((current: T) => T)) => {
    if (override) {
      override.setValue(typeof value === "function" ? (value as ((current: T) => T))(_value) : value)
      return
    }

    _setValue(value)
  }, [override?.setValue, _value])

  return [value, setValue] as [T, Dispatch<SetStateAction<T>>]
}