import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import Icon, { IconSize } from "@/shared/components/Icon"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { useCallback, useState } from "react"
import CollapsableWrapper from "@/shared/components/CollapsableWrapper"
import { Text } from "@/shared/components/Typography"
import { LargeTextType, SmallTextType, TextScale } from "@/shared/components/Typography/typography-types"
import { observer } from "mobx-react-lite"
import { classNames } from "@knownout/lib"
import "./Dropdown.scss"
import IconStack from "@/shared/components/IconStack"


export interface DropdownItem<T = any> {
  icon?: (string | JSX.Element) | (string | JSX.Element)[]
  description?: string
  rightText?: string
  value: string
  key: string
  data?: T
}

interface Props {
  itemsList: DropdownItem[],
  placeholder: string

  value: DropdownItem | null

  onChange(item: DropdownItem): void
}

function Dropdown(props: Props) {
  const [open, setOpen] = useState(false)

  const handleSelect = useCallback((value: DropdownItem) => {
    props.onChange(value)
    setOpen(false)
  }, [props.onChange])

  return (
    <Wrapper
      variant={ WrapperVariant.FlexColumnCenter }
      className={ classNames("dropdown", { open }) }
      fullWidth
    >
      <Wrapper
        variant={ WrapperVariant.FlexInlineSpaceBetween }
        onClick={ () => setOpen(!open) }
        fullWidth
        className="dropdown__header"
      >
        <Wrapper variant={ WrapperVariant.FlexInlineLeft }>
          { props.value ? (
            <Wrapper variant={ WrapperVariant.FlexInlineLeft } gap={ 8 }>
              { props.value.icon && (
                Array.isArray(props.value.icon) ? (
                  <IconStack icons={ props.value.icon } size={ IconSize.x24 } />
                ) : (
                  <Icon size={ IconSize.x24 } icon={ props.value.icon } />
                )
              ) }

              <Wrapper variant={ WrapperVariant.FlexColumnLeft } gap={ 2 }>
                <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Medium }>
                  { props.value.value }
                </Text>
                { props.value.description && (
                  <Text<TextScale.Small> textScale={ TextScale.Small } textType={ SmallTextType.Default }>
                    { props.value.description }
                  </Text>
                ) }
              </Wrapper>
            </Wrapper>
          ) : props.placeholder }
        </Wrapper>
        <Wrapper variant={ WrapperVariant.FlexInlineCenter }>
          <Icon size={ IconSize.x24 } icon={ <ChevronRightIcon /> } style={ {
            transform: open ? "rotate(90deg)" : undefined
          } } />
        </Wrapper>
      </Wrapper>

      <CollapsableWrapper open={ open } setOpen={ setOpen }>
        <div className="dropdown__wrapper">
          { props.itemsList.length === 0 && (
            <Wrapper variant={ WrapperVariant.FlexInlineCenter } style={ { opacity: 0.4 } }>
              <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Default }>
                No items found
              </Text>
            </Wrapper>
          ) }

          { props.itemsList.map((item, index) => (
            <Wrapper
              variant={ WrapperVariant.FlexInlineSpaceBetween }
              key={ index }
              gap={ 10 }
              fullWidth
              className={ classNames("dropdown__item", { selected: props.value?.key === item.key }) }
              onClick={ () => handleSelect(item) }
            >
              <Wrapper
                variant={ WrapperVariant.FlexInlineLeft }
                gap={ 8 }
              >
                { item.icon && (
                  Array.isArray(item.icon) ? (
                    <IconStack icons={ item.icon } size={ IconSize.x24 } />
                  ) : (
                    <Icon size={ IconSize.x24 } icon={ item.icon } />
                  )
                ) }

                <Wrapper variant={ WrapperVariant.FlexColumnLeft }>
                  <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Medium }>
                    { item.value }
                  </Text>
                  { item.description && (
                    <Text<TextScale.Small> textScale={ TextScale.Small } textType={ SmallTextType.Default }>
                      { item.description }
                    </Text>
                  ) }
                </Wrapper>
              </Wrapper>

              <Wrapper variant={ WrapperVariant.FlexInlineRight }>
                { item.rightText && (
                  <Text<TextScale.Small>
                    textScale={ TextScale.Small }
                    textType={ SmallTextType.Medium }
                    style={ { opacity: 0.6 } }
                  >
                    { item.rightText }
                  </Text>
                ) }
              </Wrapper>
            </Wrapper>
          )) }
        </div>
      </CollapsableWrapper>
    </Wrapper>
  )
}

export default observer(Dropdown)