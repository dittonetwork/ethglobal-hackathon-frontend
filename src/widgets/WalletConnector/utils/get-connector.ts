import walletConnectConnector from "@/widgets/WalletConnector/connectors/walletconnect.connector"
import evmConnector from "@/widgets/WalletConnector/connectors/evm.connector"

export default function getConnector(itemKey: string) {
  switch (itemKey) {
    case "wallet-connect":
      return walletConnectConnector
    default:
      return evmConnector
  }
}