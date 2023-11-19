import StateController from "@knownout/base-controller/dist/_StateController"
import { BlockchainType } from "@/types"
import { action, makeObservable, observable } from "mobx"
import useWeb3 from "@/shared/hooks/use-web3"
import useEthereumProvider from "@/shared/hooks/use-ethereum-provider"
import BigNumber from "bignumber.js"
import useStore from "@/shared/hooks/use-store"
import { ethers } from "ethers"
import Web3Store from "@/shared/stores/web3-store"
import tokensList from "@/shared/utils/tokens-list"
import assetAddress from "@/shared/utils/asset-address"

interface State {
  connected: Web3Account[]
}

export default class Web3AccountStore extends StateController<State> {
  #evmBalanceUpdateInterval?: any
  readonly #accountDataUpdateInterval?: any

  constructor() {
    super({
      connected: []
    })

    makeObservable(this)

    this.updateEvmAccount = this.updateEvmAccount.bind(this)

    const ethereum = useEthereumProvider()

    ethereum?.on("accountsChanged", this.updateEvmAccount)
    ethereum?.on("chainChanged", () => this.updateEvmAccount)

    if (this.#accountDataUpdateInterval) clearInterval(this.#accountDataUpdateInterval)
    this.#accountDataUpdateInterval = setInterval(() => {
      this.updateConnectedAccounts?.()
    }, 1000)
  }

  @action
  public removeAccountData(address: string) {
    this.setState({ connected: this.state.connected.filter(c => c.address.toLowerCase() !== address.toLowerCase()) })
  }

  @action
  public addAccountData(account: Web3Account) {
    if (this.state.connected.some(c => assetAddress(c.address).equalTo(account.address))) return

    this.setState({ connected: [...this.state.connected, account] })
  }

  @action
  public async updateConnectedAccounts() {
    await this.updateEvmAccount()
  }

  @observable
  public get() {
    return this.state.connected.find(item => item.type === BlockchainType.Ethereum)
  }

  @observable
  public getByAddress(address: string) {
    return this.state.connected.find(item => assetAddress(item.address).equalTo(address))
  }

  private ensureWalletConnectInitialized() {
    return Promise.race([
      new Promise<void>(r => {
        const interval = setInterval(() => {
          if (!(window as any).__WALLET_CONNECT_PROVIDER) return

          clearInterval(interval)
          r()
        }, 100)
      }),
      new Promise<void>(r => setTimeout(r, 5000))
    ])
  }

  @action
  private async updateEvmAccount() {
    await this.ensureWalletConnectInitialized()

    const web3 = useWeb3()
    if (!web3) return false

    const web3Store = useStore(Web3Store)

    const account = await web3.getSigner().getAddress()
    const chainId = await web3.getSigner().getChainId()

    if (this.#evmBalanceUpdateInterval) clearInterval(this.#evmBalanceUpdateInterval)
    const updateFn = async () => {
      const balance = await web3.getSigner().getBalance()
      const tokenBalances = await web3Store.getBalances(account, tokensList(chainId).list.map(l => l.address))

      this.setState({
        connected: this.state.connected.map(wallet => {
          if (wallet.address.toLowerCase() !== account.toLowerCase()) return wallet

          return {
            ...wallet,
            balance: ethers.utils.formatEther(balance),
            balanceFormatted: new BigNumber(ethers.utils.formatEther(balance))
              .dp(8, BigNumber.ROUND_DOWN)
              .toFixed(),
            tokenBalances,
            chainId: String(chainId)
          }
        })
      })
    }

    this.#evmBalanceUpdateInterval = setInterval(updateFn, 5000)
    updateFn?.()

    this.removeAccountData(account[0])
    this.addAccountData({
      address: account,
      publicKey: account,
      type: BlockchainType.Ethereum,
      chainId: chainId.toString()
    })

    return true
  }
}