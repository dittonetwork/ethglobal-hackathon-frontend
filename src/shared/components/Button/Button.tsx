import { CSSProperties, useCallback, useState } from "react"
import Loader from "@/shared/components/Loader"
import "./Button.scss"
import { Text } from "@/shared/components/Typography"
import { LargeTextType, TextScale } from "@/shared/components/Typography/typography-types"
import { classNames } from "@knownout/lib"
import Icon, { IconSize } from "@/shared/components/Icon"

export enum ButtonVariant {
  Default = "default",
  TransparentBackground = "transparent-bg",
  TransparentBackgroundRed = "transparent-bg-red",
  TransparentBackgroundYellow = "transparent-bg-yellow",
}

export interface ButtonProps {
  children: any

  className?: string

  style?: CSSProperties

  variant?: ButtonVariant

  disabled?: boolean

  fullWidth?: boolean

  icon?: JSX.Element

  active?: boolean

  onClick?(): any | Promise<any>
}

export default function Button(props: ButtonProps) {
  const [loading, setLoading] = useState(false)


  const handleClick = useCallback(() => {
    if (loading) return

    const result = props.onClick?.()

    if (result instanceof Promise) {
      setLoading(true)

      result.finally(() => setLoading(false))
    }
  }, [props.onClick, loading])

  return (
    <button
      className={ classNames("button", props.className, {
        loading,
        disabled: props.disabled,
        active: props.active
      }, props.variant ?? "default") }
      onClick={ handleClick }
      style={ {
        width: props.fullWidth ? "100%" : undefined,
        ...props.style
      } }
    >
      <Loader />

      { props.icon && (
        <Icon size={ IconSize.x24 } icon={ props.icon } />
      ) }

      { typeof props.children === "string" ? (
        <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Button }>
          { props.children }
        </Text>
      ) : (
        props.children
      ) }
    </button>
  )
}