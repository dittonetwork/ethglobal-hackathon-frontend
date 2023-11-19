import React, { CSSProperties, useCallback, useRef, useState } from "react"
import { classNames } from "@knownout/lib"
import { createPortal } from "react-dom"
import "./Tooltip.scss"
import { useTranslation } from "react-i18next"

export enum TooltipMessageType {
  Error = "error",
  Warning = "warning",
  Info = "info"
}

interface TooltipElementProps {
  x?: number
  y?: number
  show?: boolean
  content: string | { message: string, type: TooltipMessageType }[]
  elementRef: React.MutableRefObject<HTMLDivElement | null>
  cursorBottom: boolean
}

function TooltipElement(props: TooltipElementProps) {
  const { t } = useTranslation()

  return createPortal(
    (
      <div
        className={ classNames("tooltip-element", {
          show: props.x && props.y && props.show,
          bottom: props.cursorBottom
        }) }
        style={ { left: props.x, top: props.y } }
        ref={ props.elementRef }
      >
        { typeof props.content === "string"
          ? t(props.content)
          : props.content.map((item, key) => (
            <div className={ classNames("tooltip__text__component", item.type) } key={ key }>
              { t(item.message) }
            </div>
          )) }
      </div>
    ),
    document.body
  )
}

interface Props {
  content?: string | { message: string, type: TooltipMessageType }[]

  children: any

  style?: CSSProperties
}

let timeout: any
export default function Tooltip(props: Props) {
  const [position, setPosition] = useState<[number, number, boolean]>([0, 0, false])
  const [show, setShow] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)

  const handleMouseOver = useCallback(() => {
    timeout = setTimeout(() => {
      const target = ref.current

      if (!target || !elementRef.current) return

      const rect = target.getBoundingClientRect()

      let nextY = rect.y - ((elementRef.current?.offsetHeight ?? 32) + 10)
      let nextBottom = false

      if (nextY < 0) {
        nextY = rect.y + ((ref.current?.offsetHeight ?? 0) + 10)
        nextBottom = true
      }

      setPosition([
        rect.x - (elementRef.current?.offsetWidth / 2) + target.offsetWidth / 2,
        nextY,
        nextBottom
      ])

      setShow(true)
    }, 200)
  }, [ref.current, elementRef.current])

  const handleMouseOut = useCallback(() => {
    if (timeout) clearTimeout(timeout)
    setShow(false)
  }, [])

  if (!props.content) return props.children

  return (
    <div
      className="tooltip"
      onMouseOver={ event => {
        event.stopPropagation()
        event.preventDefault()
        handleMouseOver()
      } }
      onMouseOut={ event => {
        event.stopPropagation()
        event.preventDefault()
        handleMouseOut()
      } }
      ref={ ref }
    >
      <TooltipElement
        content={ props.content }
        x={ position[0] }
        y={ position[1] }
        show={ show }
        elementRef={ elementRef }
        cursorBottom={ position[2] }
      />

      { props.children }
    </div>
  )
}