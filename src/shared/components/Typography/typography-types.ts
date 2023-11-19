import React, { CSSProperties } from "react"
import "./typography-styles.scss"

export enum HeadingType {
  Large = "large",
  Medium = "medium",
  Small = "small"
}

export enum LargeTextType {
  Default = "default",
  Medium = "medium",
  Button = "button"
}

export enum SmallTextType {
  Default = "default",
  Medium = "medium",
  Button = "button",
  Bold = "bold"
}

export enum CaptionType {
  Medium = "medium",
  MediumBold = "medium-bold",
  Small = "small"
}

export enum TextScale {
  Default = "scale-default",
  Small = "scale-small"
}

export interface DefaultProps<Element extends HTMLElement> {
  children: any

  className?: string
  style?: CSSProperties

  onClick?(event: React.MouseEvent<Element>): void
}