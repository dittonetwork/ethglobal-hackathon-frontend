import { useCallback, useEffect, useRef, useState } from "react"
import BigNumber from "bignumber.js"
import useWeb3 from "@/shared/hooks/use-web3"
import { ethers } from "ethers/lib.esm"

export default function useNativeBalance(account: string) {
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0))
  const interval = useRef<any>(null)

  const forceUpdateBalance = useCallback(() => {
    const web3 = useWeb3()

    web3?.getBalance(account).then(balance => {
      if (balance) setBalance(new BigNumber(ethers.utils.formatEther(balance)))
    })
  }, [account])

  useEffect(() => {
    forceUpdateBalance()

    if (interval.current) clearInterval(interval.current)
    interval.current = setInterval(() => forceUpdateBalance(), 5000)

    return () => {
      clearInterval(interval.current)
    }
  }, [account])

  return {
    balance,
    forceUpdateBalance
  }
}