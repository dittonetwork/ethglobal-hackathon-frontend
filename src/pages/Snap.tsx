import { observer } from "mobx-react-lite"
import useWeb3AccountData from "@/shared/hooks/use-web3-account-data"
import { useCallback, useEffect, useState } from "react"
import useEthereumProvider from "@/shared/hooks/use-ethereum-provider"
import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import Block from "@/shared/components/Block"
import { Text } from "@/shared/components/Typography"
import { SmallTextType, TextScale } from "@/shared/components/Typography/typography-types"
import Button, { ButtonVariant } from "@/shared/components/Button"

function Snap() {
  const { address } = useWeb3AccountData()
  const [snapInstalled, setSnapInstalled] = useState(false)
  const [notificationState, setNotificationState] = useState(false)

  const checkSnapInstallState = useCallback(() => {
    const eth = useEthereumProvider()

    eth.request({ method: "wallet_getSnaps" }).then((snaps: any) => {
      if (Object.keys(snaps).includes("npm:ditto-notifications-snap")) setSnapInstalled(true)
      else setSnapInstalled(false)
    })
  }, [])

  useEffect(() => {
    checkSnapInstallState()
    updateNotificationState?.()
  }, [])

  const handleSnapInstall = useCallback(async () => {
    const eth = useEthereumProvider()

    const snaps = await eth.request({ method: "wallet_getSnaps" })
    if (Object.keys(snaps).includes("npm:ditto-notifications-snap")) return

    await eth.request({
      method: "wallet_requestSnaps",
      params: {
        "npm:ditto-notifications-snap": {
          version: "^0.1.10"
        }
      }
    })

    checkSnapInstallState()
  }, [])

  const updateNotificationState = useCallback(async () => {
    const result = await useEthereumProvider().request({
      method: "wallet_invokeSnap",
      params: {
        snapId: "npm:ditto-notifications-snap",
        request: {
          method: "ditto_getNotificationState",
          params: {
            address
          }
        }
      }
    })

    setNotificationState(!!result)
  }, [])

  const handleNotificationsConnect = useCallback(async () => {
    await useEthereumProvider().request({
      method: "wallet_invokeSnap",
      params: {
        snapId: "npm:ditto-notifications-snap",
        request: {
          method: "ditto_connectNotifications",
          params: {
            address
          }
        }
      }
    })

    await updateNotificationState()
  }, [])

  const handleNotificationsDisconnect = useCallback(async () => {
    await useEthereumProvider().request({
      method: "wallet_invokeSnap",
      params: {
        snapId: "npm:ditto-notifications-snap",
        request: {
          method: "ditto_disconnectNotifications",
          params: {
            address
          }
        }
      }
    })

    await updateNotificationState()
  }, [])

  if (!address) return null

  return (
    <Block title="Ditto notifications snap">
      <Wrapper variant={WrapperVariant.FlexColumnLeft} gap={20}>
        <Wrapper variant={WrapperVariant.FlexColumnLeft} gap={6} fullWidth>
          <Text textScale={TextScale.Small} textType={SmallTextType.Medium} style={{ opacity: 0.5 }}>
            To install third party snaps, you need to use MetaMask Flask instead of common MetaMask
          </Text>
          <Text textScale={TextScale.Small} textType={SmallTextType.Medium}>
            <a target="_blank" rel="noreferrer" href="https://metamask.io/flask/">Download MetaMask Flask</a>
          </Text>
        </Wrapper>

        <Wrapper variant={ WrapperVariant.FlexColumnLeft } gap={ 20 } fullWidth>
          <Button onClick={ handleSnapInstall } disabled={ snapInstalled } fullWidth>
            { snapInstalled ? "Snap already installed" : "Install notifications snap" }
          </Button>
          { snapInstalled && (
            <Wrapper variant={ WrapperVariant.FlexColumnLeft } gap={ 10 } fullWidth>
              <Button
                variant={ ButtonVariant.TransparentBackground }
                fullWidth
                onClick={ handleNotificationsConnect }
                disabled={ notificationState }
              >
                Connect notifications
              </Button>
              <Button
                variant={ ButtonVariant.TransparentBackgroundRed }
                fullWidth
                onClick={ handleNotificationsDisconnect }
                disabled={ !notificationState }
              >
                Disconnect notifications
              </Button>
            </Wrapper>
          ) }
        </Wrapper>
      </Wrapper>
    </Block>
  )
}

export default observer(Snap)