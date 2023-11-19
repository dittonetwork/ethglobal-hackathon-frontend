import "./WalletConnector.scss"
import { ModalWindow, ModalWindowBody, ModalWindowHeader } from "@opendapps/modal-window"
import ModalKeys from "@/shared/keys/modal-keys"
import Connect from "@/widgets/WalletConnector/tabs/Connect"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import useStore from "@/shared/hooks/use-store"
import Web3AccountStore from "@/shared/stores/web3-account-store"
import { observer } from "mobx-react-lite"

function WalletConnector() {
  const web3AccountStore = useStore(Web3AccountStore)

  return (
    <ModalWindow modalKey={ ModalKeys.walletConnector } onSwitch={ () => web3AccountStore.updateConnectedAccounts() }>
      <ModalWindowHeader showClose>
        Choose wallet type
      </ModalWindowHeader>

      <ModalWindowBody>
        <Wrapper variant={ WrapperVariant.FlexColumnCenter } gap={ 10 } fullWidth>
          <Wrapper variant={ WrapperVariant.FlexFullPage }>
            <Connect
              onConnectFinish={ () => web3AccountStore.updateConnectedAccounts() }
            />
          </Wrapper>
        </Wrapper>
      </ModalWindowBody>
    </ModalWindow>
  )
}

export default observer(WalletConnector)