import { classNames } from "@knownout/lib"
import "./Tabs.scss"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import { useTranslation } from "react-i18next"
import { CSSProperties, useCallback } from "react"
import Tooltip from "@/shared/components/Tooltip"

export type Tab<T = any> = {
  key: T,
  value: string,
  badge?: string | number,
  disabled?: boolean
  disableHint?: string
}

interface Props {
  elements: Tab[]

  value: Tab
  className?: string

  style?: CSSProperties

  onChange(tab: Tab): void
}

export default function Tabs(props: Props) {
  const { t } = useTranslation()

  const handleClick = useCallback((tab: Tab) => {
    if (tab.disabled) return

    props.onChange(tab)
  }, [props.onChange])

  return (
    <div className={ classNames("tabs", props.className) } style={ props.style }>
      { props.elements.map(tab => (
        <Tooltip content={ tab.disableHint } key={ tab.key }>
          <Wrapper
            variant={ WrapperVariant.FlexInlineCenter }
            className={ classNames("tabs__tab", {
              selected: tab.key === props.value.key,
              disabled: tab.disabled
            }) }
            onClick={ () => handleClick(tab) }
          >
            <div className="tabs__tab-content">
              { t(tab.value) }
            </div>

            { tab.badge !== undefined && (
              <div className="tabs__tab-badge">
                { t(String(tab.badge)) }
              </div>
            ) }
          </Wrapper>
        </Tooltip>
      )) }
    </div>
  )
}