import getNetworkData from "@/shared/utils/get-network-data"
import { NetworkType } from "@/types"
import useEthereumProvider from "@/shared/hooks/use-ethereum-provider"
import useStore from "@/shared/hooks/use-store"
import Web3AccountStore from "@/shared/stores/web3-account-store"

export default async function requestNetworkChange(chainId: ChainId) {
  const _id = String(chainId)
  const ethereum = useEthereumProvider()

  const networkData = getNetworkData(_id)
  if (networkData.type === NetworkType.Unknown) return false

  const requestChange = async () => ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${ parseInt(_id).toString(16) }` }]
  }) as Promise<unknown>

  const requestInsert = async () => ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
      chainId: `0x${ parseInt(_id).toString(16) }`,
      chainName: networkData.name,
      nativeCurrency: {
        name: networkData.symbol,
        symbol: networkData.symbol,
        decimals: 18
      },
      rpcUrls: [networkData.rpc[0]],
      blockExplorerUrls: [networkData.scannerURL]
    }]
  }) as Promise<unknown>

  const changeResult = await requestChange().catch(async error => {
    if (error?.code !== 4902 && error?.code !== -32603) return false

    if (!(await requestInsert().catch(() => false).then(() => true))) return false

    return await requestChange().catch(() => false).then(() => true)
  }).then(() => true)

  if (!changeResult) return false

  await new Promise<void>(r => {
    setInterval(() => {

      const _id = useStore(Web3AccountStore).get()?.chainId
      if (_id && String(_id) === String(chainId)) r()
    }, 50)
  })

  return true
}