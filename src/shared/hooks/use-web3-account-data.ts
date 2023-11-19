import Web3AccountStore from "@/shared/stores/web3-account-store"
import useStore from "@/shared/hooks/use-store"

export default function useWeb3AccountData() {
  const web3AccountStore = useStore(Web3AccountStore)

  const _data = web3AccountStore.get()

  return {
    address: _data?.address,
    type: _data?.type,
    chainId: _data?.chainId,
    balance: _data?.balance,
    balanceFormatted: _data?.balanceFormatted,
    tokenBalances: _data?.tokenBalances
  }
}