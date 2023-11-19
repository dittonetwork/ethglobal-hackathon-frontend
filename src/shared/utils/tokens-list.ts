import Tokens from "@/app/configs/tokens"
import assetAddress from "@/shared/utils/asset-address"

export default function tokensList(chainId: ChainId) {
  const resulting = [...(Tokens[chainId] ?? [])]
  const _array: Erc20Token[] = []

  resulting.forEach(item => {
    if (_array.find(t => assetAddress(t.address).equalTo(item.address))) return

    _array.push(item)
  })

  return {
    findByAddress(address: string) {
      return _array.find(i => assetAddress(i.address).equalTo(address))
    },

    findBySymbol(symbol: string) {
      return _array.find(i => assetAddress(i.symbol).equalTo(symbol))
    },

    get addresses() {
      return _array?.map(i => i.address) ?? []
    },

    get list() {
      return _array
    }
  }
}