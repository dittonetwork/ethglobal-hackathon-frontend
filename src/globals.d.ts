import { BlockchainType, NetworkType } from "@/types"
import BigNumber from "bignumber.js"

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
      WALLETCONNECT_PROJECT_ID: string
      BACKEND_ADDRESS: string
    }
  }

  type ChainId = string | numbert

  interface NetworkData {
    id: number,
    icon: string,
    name: string,
    symbol: string,
    rpc: string[],
    type: NetworkType
    wrappedAddress: string
    scannerURL: string
    priceFeed: string
  }

  interface Erc20Token {
    symbol: string
    address: string
    decimals: number
    icon: string
    name: string
    priceFeed: string
    chainId: number
    currentBlockchainNative?: true

    nativeCoin?: boolean
    stableCoin?: boolean

    stargatePoolId?: number
  }

  type EthereumLikeAddress = `0x${ string }`

  type AnyAddress = `0${ string }`

  type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

  interface Web3Account {
    address: string
    publicKey: string
    type: BlockchainType
    balance?: string
    balanceFormatted?: string
    chainId?: string
    tokenBalances?: { tokenAddress: string, balance: BigNumber }[]
  }
}