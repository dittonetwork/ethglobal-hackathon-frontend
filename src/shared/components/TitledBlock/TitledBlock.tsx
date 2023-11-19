import { LargeTextType, SmallTextType, TextScale } from "@/shared/components/Typography/typography-types"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import { Text } from "@/shared/components/Typography"
import HintIcon from "@/shared/components/HintIcon"

interface Props {
  title: string

  children: any

  variant?: WrapperVariant

  gap?: number

  hint?: string
}

export default function TitledBlock(props: Props) {
  const children = (
    typeof props.children === "string" ? (
      <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Default }>
        { props.children }
      </Text>
    ) : props.children
  )

  return (
    <Wrapper variant={ props.variant ?? WrapperVariant.FlexColumnLeft } fullWidth gap={ 4 }>
      <Wrapper variant={ WrapperVariant.FlexInlineLeft } gap={ 4 }>
        <Text textScale={ TextScale.Small } textType={ SmallTextType.Medium } style={ { opacity: 0.5 } }>
          { props.title }
        </Text>
        { props.hint && (
          <HintIcon hint={ props.hint } />
        ) }
      </Wrapper>
      { props.variant ? (
        <Wrapper variant={ props.variant } fullWidth gap={ props.gap }>
          { children }
        </Wrapper>
      ) : children }
    </Wrapper>
  )
}