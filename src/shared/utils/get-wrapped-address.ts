import getNetworkData from "@/shared/utils/get-network-data"

export default function getWrappedAddress(chainId: ChainId) {
  const chainData = getNetworkData(chainId)

  return chainData.wrappedAddress
}