import StateController from "@knownout/base-controller/dist/_StateController"
import { makeObservable } from "mobx"
import { ethers } from "ethers"

interface State {
  address?: AnyAddress
  chainId?: ChainId
  publicKey?: string
  // TODO: implement balance read
  balance?: string
}

export default abstract class BlockchainTypedStore<T extends ethers.providers.Provider> extends StateController<State> {
  protected constructor(protected readonly rpc: T) {
    super({})

    makeObservable(this)

    this.updateAccountData = this.updateAccountData.bind(this)
    this.startListener = this.startListener.bind(this)
    this.killListener = this.killListener.bind(this)
    this.ensureDataLoaded = this.ensureDataLoaded.bind(this)

    this.startListener()
    this.updateAccountData()
  }

  /**
   * Kill account and chainId change listener (interval)
   */
  public abstract killListener(): void

  /**
   * Start new listener (interval) that will update account address and chain id
   * Kills previous listener
   */
  public abstract startListener(): void

  /**
   * Manually update account data
   *
   * In normal cases, must be called only from listener, do not use
   * this function in common code
   */
  public abstract updateAccountData(): Promise<void>

  /**
   * Wait until chain id and wallet address will be loaded
   */
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
}