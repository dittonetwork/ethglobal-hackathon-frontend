import React from "react"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import { classNames } from "@knownout/lib"
import "./CollapseChevron.scss"
import Icon, { IconSize } from "@/shared/components/Icon"
import { ChevronDoubleUpIcon } from "@heroicons/react/20/solid"

interface Props {
  updateValue: React.Dispatch<React.SetStateAction<number>>
  value: number

  invert?: boolean
}

export default function CollapseChevron(props: Props) {
  const handleSwitchHeader = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement

    const parent = target.parentElement
    if (!parent) return

    const rect = parent.getBoundingClientRect()
    const elementRect = target.getBoundingClientRect()

    props.updateValue(current => (current === 0 ? ((rect.height - elementRect.height) / (props.invert ? 2 : 1)) - (props.invert ? 0 : 4) : 0))
  }

  return (
    <Wrapper
      variant={ WrapperVariant.FlexInlineCenter }
      fullWidth
      className={ classNames("collapse-chevron", { rotate: props.value !== 0, invert: props.invert }) }
      onClick={ handleSwitchHeader }
    >
      <Icon size={ IconSize.x16 } icon={ <ChevronDoubleUpIcon /> } />
    </Wrapper>
  )
}