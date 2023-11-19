import { observer } from "mobx-react-lite"
import Block from "@/shared/components/Block"
import { useEffect, useState } from "react"
import useWeb3AccountData from "@/shared/hooks/use-web3-account-data"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import Constants from "@/app/configs/constants"
import useWeb3 from "@/shared/hooks/use-web3"
import BigNumber from "bignumber.js"
import Loader from "@/shared/components/Loader"
import { Caption, Text } from "@/shared/components/Typography"
import { CaptionType, LargeTextType, SmallTextType, TextScale } from "@/shared/components/Typography/typography-types"
import Icon, { IconSize } from "@/shared/components/Icon"
import getNetworkData from "@/shared/utils/get-network-data"
import shortenAddress from "@/shared/utils/shorten-address"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"

type TVaults = { chainId: number, address: string }[]
type TVaultsWithData = { chainId: number, address: string, balance: string }[]

function Vaults() {
  const { address } = useWeb3AccountData()

  const [vaults, setVaults] = useState<TVaultsWithData>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(Constants.backendURL + "vault/" + address).then(r => r.json())
      .then((rawVaults: TVaults) => {
        Promise.all(
          rawVaults.filter(v => getNetworkData(v.chainId).symbol !== "?").map(async rawData => {
            const web3 = useWeb3(rawData.chainId)
            const balanceRaw = await web3.getBalance(rawData.address)

            return {
              ...rawData,
              balance: new BigNumber(balanceRaw.toString()).shiftedBy(-18).dp(6).toFixed()
            }
          })
        ).then(setVaults)
          .finally(() => setLoading(false))
      })
      .catch(() => setLoading(false))

    // Do backend stuff
  }, [address])

  return (
    <Block title="Multi-chain vaults">
      <Wrapper variant={WrapperVariant.FlexColumnLeft} fullWidth gap={10}>
        { loading ? (
          <Wrapper variant={WrapperVariant.FlexInlineCenter} fullWidth>
            <Loader invert/>
          </Wrapper>
        ) : (
          vaults.length === 0 ? (
            <Text textScale={ TextScale.Small } textType={ SmallTextType.Medium } style={ { opacity: 0.5 } }>
              No vaults yet
            </Text>
          ) : (
            vaults.map(vaultData => (
              <Wrapper variant={ WrapperVariant.FlexColumnLeft } gap={ 6 } style={ {
                padding: 16,
                borderRadius: 8,
                background: "rgba(0, 0, 0, 0.05)"
              } } fullWidth key={ vaultData.address + vaultData.chainId }>
                <Wrapper variant={ WrapperVariant.FlexInlineLeft } gap={ 6 }>
                  <Icon size={ IconSize.x24 } icon={ getNetworkData(vaultData.chainId).icon }/>
                  <Text<TextScale.Default> textScale={ TextScale.Default } textType={ LargeTextType.Medium }>
                    Vault { shortenAddress(vaultData.address) } on { getNetworkData(vaultData.chainId).name }
                  </Text>
                </Wrapper>
                <Caption captionType={ CaptionType.Medium }>
                  <a
                    href={ getNetworkData(vaultData.chainId).scannerURL + "address/" + vaultData.address }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Wrapper variant={ WrapperVariant.FlexInlineLeft } gap={ 4 }>
                      { shortenAddress(vaultData.address, 8) }
                      <Icon size={ IconSize.x14 } icon={ <ArrowTopRightOnSquareIcon/> }/>
                    </Wrapper>
                  </a>
                </Caption>
                <Text textScale={ TextScale.Small } textType={ SmallTextType.Medium } style={ { opacity: 0.5 } }>
                  Balance: { vaultData.balance } { getNetworkData(vaultData.chainId).symbol }
                </Text>
              </Wrapper>
            ))
          )
        ) }
      </Wrapper>
    </Block>
  )
}

export default observer(Vaults)