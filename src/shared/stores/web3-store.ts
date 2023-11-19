import { action, makeObservable } from "mobx"
import Logger from "@/shared/utils/logger"
import BlockchainTypedStore from "@/entities/blockchain-typed-store"
import useWeb3 from "@/shared/hooks/use-web3"
import { ethers } from "ethers"
import useStore from "@/shared/hooks/use-store"
import Web3AccountStore from "@/shared/stores/web3-account-store"
import { ERC20TokenABI } from "@/app/abis/ERC20TokenABI"
import { Multicall } from "ethereum-multicall"
import BigNumber from "bignumber.js"
import tokensList from "@/shared/utils/tokens-list"
import { ChainLinkPriceFeedABI } from "@/app/abis/ChainLinkPriceFeedABI"
import Constants from "@/app/configs/constants"

export default class Web3Store extends BlockchainTypedStore<ethers.providers.Web3Provider> {
  private static _updateInterval: any

  constructor() {
    const provider = useWeb3()
    if (!provider) throw new Error("No provider")

    super(provider)

    makeObservable(this)
  }

  public killListener() {
    if (Web3Store._updateInterval) clearInterval(Web3Store._updateInterval)
  }

  public startListener() {
    this.killListener()
    Web3Store._updateInterval = setInterval(this.updateAccountData, 1000)
  }

  @action
  public async updateAccountData() {
    const web3 = useWeb3()

    if (!web3?._isProvider) return

    return Promise.all([
      this.rpc.getSigner().getChainId(),
      this.rpc.getSigner().getAddress()
    ]).then(data => {
      if (data[0]) this.setState("chainId", data[0])
      if (data[1]) this.setState("address", data[1])
    }).catch((e: any) => {
      Logger.errorFrom("UpdateAccount", "Error while trying to update account data\n", e)
    })
  }

  public async ensureDataLoaded() {
    if (this.state.address && this.state.chainId) return

    return new Promise<void>(r => {
      const interval = setInterval(() => {
        if (this.state.address && this.state.chainId) {
          clearInterval(interval)
          r()
        }
      }, 100)
    })
  }

  public async getBalances(holder: string, addresses: string[], web3?: ethers.providers.Provider, chainId?: ChainId) {
    const account = useStore(Web3AccountStore).get()
    if (!account) return []

    const multicall = new Multicall({
      ethersProvider: web3 ?? this.rpc,
      tryAggregate: true
    })

    const calls = addresses.map(address => ({
      reference: address.toLowerCase(),
      contractAddress: address,
      abi: ERC20TokenABI as unknown as any[],
      calls: [
        {
          reference: address,
          methodName: "balanceOf",
          methodParameters: [holder]
        }
      ]
    }))

    const balancesList = await multicall.call(calls)

    const balances: { tokenAddress: string, balance: BigNumber }[] = []

    Object.values(balancesList.results).forEach((value) => {
      const rv = value.callsReturnContext[0].returnValues[0]?.hex

      const token = tokensList(chainId ?? account.chainId).findByAddress(value.originalContractCallContext.reference)

      if (!token) return
      balances.push({
        tokenAddress: value.originalContractCallContext.reference,
        balance: new BigNumber(rv ?? "0x00").shiftedBy(-(token?.decimals ?? 0))
      })
    })

    if (addresses.includes(Constants.zeroAddress)) {
      const _nextValue = {
        tokenAddress: Constants.zeroAddress,
        balance: new BigNumber((await (web3 ?? this.rpc).getBalance(holder)).toString()).shiftedBy(-18)
      }

      const nextIndex = balances.findIndex(b => b.tokenAddress === Constants.zeroAddress)

      if (nextIndex !== -1) balances[balances.findIndex(b => b.tokenAddress === Constants.zeroAddress)] = _nextValue
      else balances.push(_nextValue)
    }

    return balances
  }

  public async getPrices(addresses: string[], web3?: ethers.providers.Provider, chainId?: ChainId) {
    const _addresses = addresses.filter(Boolean).map(a => a.toLowerCase())

    const account = useStore(Web3AccountStore).get()
    if (!account) return []

    const multicall = new Multicall({
      ethersProvider: web3 ?? this.rpc,
      tryAggregate: true
    })

    const priceFeeds = tokensList(chainId ?? account.chainId).list.map(token => {
      if (!_addresses.includes(token.address.toLowerCase())) return null

      return [token.address.toLowerCase(), token.priceFeed]
    }).filter(Boolean) as [string, string][]

    const calls = priceFeeds.map(data => ({
      reference: data[0].toLowerCase(),
      contractAddress: data[1],
      abi: ChainLinkPriceFeedABI as unknown as any[],
      calls: [
        {
          reference: data[1],
          methodName: "latestRoundData",
          methodParameters: []
        }
      ]
    }))

    const pricesList = await multicall.call(calls)

    const prices: { tokenAddress: string, price: BigNumber }[] = []

    Object.values(pricesList.results).forEach((value) => {
      const rv = value.callsReturnContext[0].returnValues[1]?.hex

      prices.push({
        tokenAddress: value.originalContractCallContext.reference,
        price: new BigNumber(rv ?? "0x00").shiftedBy(-8)
      })
    })

    return prices
  }
}