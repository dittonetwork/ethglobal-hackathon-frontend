import { DefaultProps, LargeTextType, SmallTextType, TextScale } from "@/shared/components/Typography/typography-types"
import { classNames } from "@knownout/lib"
import { useTranslation } from "react-i18next"
import React from "react"

interface TextProps<Scale extends TextScale> extends DefaultProps<HTMLSpanElement> {
  textScale: Scale

  textType: Scale extends TextScale.Small ? SmallTextType : LargeTextType

  ellipsis?: boolean

  align?: "left" | "right" | "center"

  onCopy?(event: React.ClipboardEvent<HTMLSpanElement>): void
}

export default function Text<T extends TextScale = TextScale.Small>(props: TextProps<T>) {
  const { t } = useTranslation()

  return (
    <span
      className={ classNames("typography-text", props.className, props.textType, props.textScale) }
      onClick={ props.onClick }
      style={ {
        overflow: props.ellipsis ? "hidden" : undefined,
        textOverflow: props.ellipsis ? "ellipsis" : undefined,
        whiteSpace: props.ellipsis ? "nowrap" : undefined,
        width: props.ellipsis ? "100%" : undefined,
        textAlign: props.align,
        ...props.style
      } }
      onCopy={ props.onCopy }
    >
      { typeof props.children === "string" ? t(props.children) : props.children }
    </span>
  )
}
