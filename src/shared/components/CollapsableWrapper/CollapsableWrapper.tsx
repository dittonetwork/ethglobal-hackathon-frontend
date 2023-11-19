import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import safeReduceArray from "@/shared/utils/safe-reduce-array"

interface Props {
  children: any

  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>

  className?: string
}

export default function CollapsableWrapper(props: Props) {
  const [height, setHeight] = useState<number>()
  // const [transition, setTransition] = useState(true)

  const ref = useRef<HTMLDivElement | null>(null)

  const updateBaseHeight = useCallback(() => {
    const target = ref.current

    if (!target || !props.open) return

    // const height = target.scrollHeight
    const childHeight = safeReduceArray(Array.from(target.childNodes).map(node => (node as HTMLElement).offsetHeight))

    setHeight(childHeight.toNumber())
  }, [ref.current, props.open])

  // useEffect(() => {
  // setTransition(true)

  // setTimeout(() => setTransition(false), 210)
  // }, [props.open])

  useEffect(() => {
    const interval = setInterval(updateBaseHeight, 200)
    updateBaseHeight()

    return () => clearInterval(interval)
  }, [props.open, props.children, updateBaseHeight])

  return (
    <div
      ref={ ref }
      style={ {
        transition: /*transition ? */"200ms ease height" /*: undefined*/,
        height: props.open ? height || 0 : 0,
        overflow: "hidden",
        width: "100%",
        position: "relative"
      } }
      className={ props.className }
    >
      { props.children }
    </div>
  )
}