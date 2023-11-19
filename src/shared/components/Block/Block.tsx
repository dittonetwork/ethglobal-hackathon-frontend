import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import "./Block.scss"
import { Text } from "@/shared/components/Typography"
import { LargeTextType, TextScale } from "@/shared/components/Typography/typography-types"
import Button, { ButtonVariant } from "@/shared/components/Button"
import { CSSProperties } from "react"


interface Props {
  title?: string

  children: any

  overflow?: boolean

  actions?: {
    name: string
    onClick?: () => Promise<any> | any
    variant?: ButtonVariant
  }[]

  style?: CSSProperties
}

export default function Block(props: Props) {
  return (
    <Wrapper
      variant={ WrapperVariant.FlexColumnLeft }
      className="block"
      gap={ 32 }
      fullWidth
      style={ props.style }
      overflow={ props.overflow }
    >
      <Wrapper
        variant={ WrapperVariant.FlexColumnLeft }
        className="block__content"
        gap={ 10 }
        overflow={ props.overflow }
        fullWidth
      >
        { props.title && (
          <Text<TextScale.Default>
            textScale={ TextScale.Default }
            textType={ LargeTextType.Medium }
            style={ { opacity: 0.5 } }
          >
            { props.title }
          </Text>
        ) }

        <Wrapper
          variant={ WrapperVariant.FlexColumnLeft }
          className="block__wrapper"
          fullWidth
          overflow={ props.overflow }
        >
          { typeof props.children === "string" ? (
            <Text<TextScale.Default>
              textScale={ TextScale.Default }
              textType={ LargeTextType.Medium }
              ellipsis
            >
              { props.children }
            </Text>
          ) : props.children }
        </Wrapper>
      </Wrapper>

      { props.actions && (
        <Wrapper variant={ WrapperVariant.FlexColumnLeft } className="block__actions" gap={ 10 } fullWidth>
          { props.actions.map((action, index) => (
            <Button key={ index } variant={ action.variant } onClick={ action.onClick } fullWidth>
              { action.name }
            </Button>
          )) }
        </Wrapper>
      ) }
    </Wrapper>
  )
}