import useEthereumProvider from "@/shared/hooks/use-ethereum-provider"
import { ethers } from "ethers"
import getNetworkData from "@/shared/utils/get-network-data"
import { Random } from "@knownout/lib"

function safeParseProvider(chainId?: ChainId) {
  const eth = useEthereumProvider()

  if (!chainId) return eth

  const networkData = getNetworkData(chainId)

  return Random.arrayElement(networkData.rpc)
}

export default function useWeb3(): ethers.providers.Web3Provider | null

export default function useWeb3(chainId: ChainId, currentChainId?: ChainId): ethers.providers.JsonRpcProvider

export default function useWeb3(chainId?: ChainId, currentChainId?: ChainId): ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | null {
  const rpcData = safeParseProvider(parseInt(chainId))

  if (!rpcData) return null

  if (chainId !== undefined && String(currentChainId) === String(chainId)) return new ethers.providers.Web3Provider(useEthereumProvider(), parseInt(chainId) || "any")

  if (chainId) return new ethers.providers.JsonRpcProvider(rpcData, parseInt(chainId))
  return new ethers.providers.Web3Provider(rpcData, parseInt(chainId) || "any")
}