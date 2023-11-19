import Tooltip from "@/shared/components/Tooltip"
import Icon, { IconSize } from "@/shared/components/Icon"
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid"
import React from "react"
import { TooltipMessageType } from "@/shared/components/Tooltip/Tooltip"
import { observer } from "mobx-react-lite"

interface Props {
  hint: string | { message: string, type: TooltipMessageType }[]
}

function HintIcon(props: Props) {
  return (
    <Tooltip content={ props.hint }>
      <Icon size={ IconSize.x14 } icon={ <QuestionMarkCircleIcon /> } style={ {
        opacity: 0.6,
        cursor: "help"
      } } />
    </Tooltip>
  )
}

export default observer(HintIcon)