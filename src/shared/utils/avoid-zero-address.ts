import Constants from "@/app/configs/constants"
import getWrappedAddress from "@/shared/utils/get-wrapped-address"

export default function avoidZeroAddress(token: Erc20Token): string

export default function avoidZeroAddress(token: string, chainId: ChainId): string

export default function avoidZeroAddress(token: Erc20Token | string, chainId?: ChainId): string {
  if (typeof token === "string" && chainId) {
    if (token === Constants.zeroAddress) return getWrappedAddress(chainId)
    return token
  }

  if (typeof token === "string" && !chainId) return token

  if (typeof token !== "string") {
    if (token.address === Constants.zeroAddress) return getWrappedAddress(token.chainId)
    return token.address
  }

  return token
}