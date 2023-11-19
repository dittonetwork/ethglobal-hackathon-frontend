import useWeb3 from "@/shared/hooks/use-web3"
import { BlockchainType } from "@/types"
import ModalKeys from "@/shared/keys/modal-keys"
import { useModalWindowController } from "@opendapps/modal-window"

interface Options {
  onConnectFinish?(result: boolean, account?: Web3Account): void

  onConnected?(account: Web3Account): void
}

export default async function checkAccounts(options: Options) {
  const mvc = useModalWindowController()

  const web3 = useWeb3()

  if (!web3) return false
  return web3?.getSigner().getAddress().then(address => {
    if (!address) {
      options.onConnectFinish?.(false)
      return false
    }

    const account = {
      address: address,
      type: BlockchainType.Ethereum,
      publicKey: address
    }

    options.onConnected?.(account)
    options.onConnectFinish?.(true, account)
    mvc.closeModal(ModalKeys.walletConnector)

    return true
  })
}