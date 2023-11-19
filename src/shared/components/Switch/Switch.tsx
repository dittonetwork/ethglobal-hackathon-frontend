import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import { classNames } from "@knownout/lib"
import { Text } from "@/shared/components/Typography"
import { LargeTextType, TextScale } from "@/shared/components/Typography/typography-types"
import "./Switch.scss"
import HintIcon from "@/shared/components/HintIcon"

interface Props {
  children: any

  hint?: string

  state: boolean
  variant?: WrapperVariant.FlexInlineLeft | WrapperVariant.FlexInlineRight

  onChange(state: boolean): any
}

export default function Switch(props: Props) {
  const variant = props.variant ?? WrapperVariant.FlexInlineLeft

  return (
    <Wrapper
      variant={ variant }
      className={ classNames("switch", { selected: props.state }) }
      gap={ 10 }
      onClick={ () => props.onChange(!props.state) }
    >
      { variant === WrapperVariant.FlexInlineLeft && (
        <div className="switch__block">
          <div className="switch__circle" />
        </div>
      ) }

      <Wrapper variant={ variant } gap={ 6 } style={ { textAlign: "left" } }>
        { typeof props.children === "string" ? (
          <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Default }>
            { props.children }
          </Text>
        ) : (
          props.children
        ) }

        { props.hint && (
          <HintIcon hint={ props.hint } />
        ) }
      </Wrapper>

      { variant === WrapperVariant.FlexInlineRight && (
        <div className="switch__block">
          <div className="switch__circle" />
        </div>
      ) }
    </Wrapper>
  )
}