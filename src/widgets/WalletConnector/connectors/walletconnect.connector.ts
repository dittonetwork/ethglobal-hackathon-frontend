import ModalKeys from "@/shared/keys/modal-keys"
import { useModalWindowController } from "@opendapps/modal-window"
import Logger from "@/shared/utils/logger"
import { IEthereumProvider } from "@walletconnect/ethereum-provider/dist/types/EthereumProvider"
import useStorage from "@/shared/hooks/use-storage"
import StorageKeys from "@/shared/keys/storage-keys"

interface Options {
  checkAccounts(): Promise<any>,

  updateLoadingState(loadingState: string): void
}

export default async function walletConnectConnector(options: Options) {
  const mvc = useModalWindowController()

  useStorage(localStorage).setItem(StorageKeys.UseWalletConnect, true)

  setTimeout(() => {
    mvc.closeModal(ModalKeys.walletConnector)
    options.updateLoadingState(String())
  }, 500)

  const provider = (window as any).__WALLET_CONNECT_PROVIDER as IEthereumProvider

  await provider.connect();
  (window as any).__WALLET_CONNECT_PROVIDER = provider

  new Promise<void>(async resolve => {
    try {
      Logger.infoFrom("WalletConnectConnector", "Checking accounts...")
      await options.checkAccounts()
    } catch (e: any) {
      Logger.errorFrom("WalletConnectConnector", "Error while connecting wallet", e?.message)

      if (e) console.error(e)
      resolve()
    }

    Logger.infoFrom("WalletConnectConnector", "Sequence successfully finished")
    resolve()
  })
}