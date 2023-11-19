import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import { useCallback, useState } from "react"
import { BlockchainType } from "@/types"
import { observer } from "mobx-react-lite"
import WalletButton from "@/widgets/WalletConnector/components/WalletButton"
import checkAccounts from "@/widgets/WalletConnector/utils/check-accounts"
import getConnector from "@/widgets/WalletConnector/utils/get-connector"

interface Props {
  onConnectFinish?(result: boolean, account?: Web3Account): void

  onConnected?(account: Web3Account): void
}

function Connect(props: Props) {
  const [loading, setLoading] = useState(String())

  const handleClick = useCallback((itemKey: string) => {
    const connector = getConnector(itemKey)

    setLoading(itemKey)
    connector({
      ...props,
      updateLoadingState: setLoading,
      checkAccounts: () => checkAccounts(props)
    })
  }, [props, checkAccounts])

  return (
    <Wrapper variant={ WrapperVariant.FlexColumnLeft } className="wcc" gap={ 10 } fullWidth>
      <WalletButton
        itemKey="metamask"
        wallet={ {
          icon: "wallets/metamask",
          type: BlockchainType.Ethereum,
          name: "Metamask wallet"
        } }
        onClick={ handleClick }
        loadingKey={ loading }
      />

      <WalletButton
        itemKey="wallet-connect"
        wallet={ {
          icon: "wallets/wallet-connect",
          type: BlockchainType.Ethereum,
          name: "Wallet connect"
        } }
        onClick={ handleClick }
        loadingKey={ loading }
      />
    </Wrapper>
  )
}

export default observer(Connect)