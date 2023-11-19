import { observer } from "mobx-react-lite"
import "./App.scss"
import React from "react"
import EthereumProvider from "@walletconnect/ethereum-provider"
import { useModalWindowController } from "@opendapps/modal-window"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import useWeb3AccountData from "@/shared/hooks/use-web3-account-data"
import { Text } from "@/shared/components/Typography"
import { LargeTextType, TextScale } from "@/shared/components/Typography/typography-types"
import shortenAddress from "@/shared/utils/shorten-address"
import ModalKeys from "@/shared/keys/modal-keys"
import Button from "@/shared/components/Button"
import Block from "@/shared/components/Block"
import Snap from "@/pages/Snap"
import Vaults from "@/pages/Vaults"

EthereumProvider.init({
  chains: [137],
  showQrModal: true,
  projectId: process.env.WALLETCONNECT_PROJECT_ID
}).then(provider => {
  (window as any).__WALLET_CONNECT_PROVIDER = provider
})

function App() {
  const mvc = useModalWindowController()
  const { address } = useWeb3AccountData()

  return (
    <div className="app-wrapper">
      <Wrapper variant={ WrapperVariant.GridFullPage } fullWidth>
        <Wrapper
          variant={ WrapperVariant.FlexColumnCenter }
          gap={ 20 }
          fullWidth
          style={ { width: "min(500px, 100%)" } }
        >
          <Block title="Account details">
            { address !== undefined ? (
              <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Medium }>
                Connected to: { shortenAddress(address) }
              </Text>
            ) : (
              <Button onClick={ () => mvc.openModal(ModalKeys.walletConnector) } fullWidth>
                Connect wallet
              </Button>
            ) }
          </Block>

          { address !== undefined && (
            <Wrapper variant={ WrapperVariant.FlexColumnLeft } gap={ 20 } fullWidth>
              <Snap/>
              <Vaults/>
            </Wrapper>
          ) }
        </Wrapper>
      </Wrapper>
    </div>
  )
}

export default observer(App)