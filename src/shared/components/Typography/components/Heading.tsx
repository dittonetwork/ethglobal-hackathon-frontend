import { DefaultProps, HeadingType } from "@/shared/components/Typography/typography-types"
import React from "react"
import { classNames } from "@knownout/lib"
import { useTranslation } from "react-i18next"

interface HeadingProps extends DefaultProps<HTMLHeadingElement> {
  headingType: HeadingType
}

export default function Heading(props: HeadingProps) {
  const { t } = useTranslation()

  const itemType = {
    [HeadingType.Large]: "h1",
    [HeadingType.Medium]: "h2",
    [HeadingType.Small]: "h3"
  }[props.headingType]

  return React.createElement(itemType, {
    className: classNames("typography-heading", props.className, props.headingType),
    onClick: props.onClick,
    style: props.style
  }, typeof props.children === "string" ? t(props.children) : props.children)
}