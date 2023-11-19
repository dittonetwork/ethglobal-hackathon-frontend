import { BlockchainType } from "@/types"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import { classNames } from "@knownout/lib"
import Icon, { IconSize } from "@/shared/components/Icon"
import { Text } from "@/shared/components/Typography"
import { LargeTextType, TextScale } from "@/shared/components/Typography/typography-types"
import Loader from "@/shared/components/Loader"

interface Props {
  loadingKey?: string

  itemKey: string

  wallet: {
    icon: string
    name: string
    type: BlockchainType
  }

  onClick?(itemKey: string): void
}

export default function WalletButton(props: Props) {
  return (
    <Wrapper
      variant={ WrapperVariant.FlexInlineLeft }
      gap={ 20 }
      className={ classNames("wcc__button", {
        selected: props.loadingKey === props.itemKey,
        disabled: props.loadingKey !== ""
      }) }
      fullWidth
      onClick={ () => props.onClick?.(props.itemKey) }
    >
      <Icon size={ IconSize.x48 } icon={ props.wallet.icon } />
      <Wrapper variant={ WrapperVariant.FlexColumnLeft }>
        <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Medium }>
          { props.wallet.name }
        </Text>
      </Wrapper>
      { props.loadingKey === props.itemKey && (
        <div style={ { marginLeft: "auto" } }>
          <Loader />
        </div>
      ) }
    </Wrapper>
  )
}
