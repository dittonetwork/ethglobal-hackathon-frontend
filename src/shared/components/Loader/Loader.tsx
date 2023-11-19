import "./Loader.scss"
import { classNames } from "@knownout/lib"
import { CSSProperties } from "react"

export enum LoaderScale {
  x24 = 24,
  x32 = 32,
  x20 = 20,
  x16 = 16
}

interface Props {
  invert?: boolean

  scale?: LoaderScale

  spinnerStyle?: CSSProperties
  style?: CSSProperties
}

export default function Loader(props: Props) {
  return (
    <div
      className={ classNames("loader", { invert: props.invert }) }
      style={ {
        width: props.scale,
        height: props.scale,
        minWidth: props.scale,
        
        ...props.style
      } }
    >
      <div className="loader__spinner" style={ props.spinnerStyle } />
    </div>
  )
}