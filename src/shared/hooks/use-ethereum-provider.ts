import StorageKeys from "@/shared/keys/storage-keys"
import useStorage from "@/shared/hooks/use-storage"

export default function useEthereumProvider() {
  const storage = useStorage(localStorage)

  if (storage.getItem(StorageKeys.UseWalletConnect) && (window as any).__WALLET_CONNECT_PROVIDER) return (window as any).__WALLET_CONNECT_PROVIDER

  return (window as any).ethereum as any
}