import { classNames } from "@knownout/lib"
import Icon, { IconSize } from "@/shared/components/Icon"
import "./IconStack.scss"
import { CSSProperties } from "react"

interface Props {
  icons: (string | JSX.Element)[]

  size: IconSize

  className?: string

  style?: CSSProperties

  onClick?(): void
}

export default function IconStack(props: Props) {
  if (props.icons.length < 1) return null

  return (
    <div
      className={ classNames("icon-stack", props.className) }
      onClick={ props.onClick }
      style={ {
        "--iconSize": props.size + "px",
        ...props.style
      } as any }
    >
      { [...props.icons].reverse().map((icon, index) => (
        <Icon size={ props.size } icon={ icon } key={ index } />
      )) }
    </div>
  )
}