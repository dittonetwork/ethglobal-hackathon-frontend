import useEthereumProvider from "@/shared/hooks/use-ethereum-provider"
import Logger from "@/shared/utils/logger"
import useStorage from "@/shared/hooks/use-storage"
import StorageKeys from "@/shared/keys/storage-keys"

interface Options {
  checkAccounts(): Promise<any>

  updateLoadingState(loadingState: string): void
}

export default function evmConnector(options: Options) {
  const ethereum = useEthereumProvider()

  useStorage(localStorage).setItem(StorageKeys.UseWalletConnect, false)

  Logger.infoFrom("EvmConnector", "Attempt to connect wallet...")
  try {
    ethereum.enable().finally(async () => {
      new Promise<void>(async resolve => {
        try {
          Logger.infoFrom("EvmConnector", "Checking accounts...")
          await options.checkAccounts()
        } catch (e: any) {
          Logger.errorFrom("EvmConnector", "Error while connecting wallet", e?.message)

          if (e) console.error(e)
          resolve()
        }

        Logger.infoFrom("EvmConnector", "Sequence successfully finished")
        resolve()
      }).finally(() => options.updateLoadingState(String()))
    })
  } catch {
    options.updateLoadingState(String())
  }
}