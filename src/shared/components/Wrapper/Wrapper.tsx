import { classNames } from "@knownout/lib"
import "./Wrapper.scss"
import React, { CSSProperties, forwardRef } from "react"

export enum WrapperVariant {
  GridFullPage = "gridFullPage",
  FlexFullPage = "flexFullPage",
  FlexInlineCenter = "flexInlineCenter",
  FlexInlineSpaceBetween = "flexInlineSpaceBetween",
  FlexInlineRight = "flexInlineRight",
  FlexInlineLeft = "flexInlineLeft",
  FlexColumnCenter = "flexColumnCenter",
  FlexColumnLeft = "flexColumnLeft",
  FlexColumnRight = "flexColumnRight",
  FlexColumnSpaceBetween = "flexColumnSpaceBetween"
}

export interface WrapperProps {
  variant: WrapperVariant

  children: any

  gap?: number

  className?: string

  style?: CSSProperties

  fullWidth?: boolean

  wrap?: boolean | "nowrap" | "wrap" | "wrap-reverse"

  overflow?: boolean

  onClick?(event: React.MouseEvent<HTMLDivElement>): void

  onTransitionEnd?(event: React.TransitionEvent<HTMLDivElement>): void
}

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>((props, ref) => {
  return (
    <div
      className={ classNames("wrapper", props.variant, props.className, { overflow: props.overflow }) }
      style={ {
        gap: props.gap,
        width: props.fullWidth ? "100%" : undefined,
        flexWrap: typeof props.wrap === "boolean" ? "wrap" : props.wrap,
        ...props.style
      } }
      onClick={ props.onClick }
      ref={ ref }
      onTransitionEnd={ props.onTransitionEnd }
    >
      { props.children }
    </div>
  )
})

Wrapper.displayName = "Wrapper"
export default Wrapper
