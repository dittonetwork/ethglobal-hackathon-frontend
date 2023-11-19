export default function shortenAddress(address: any, size = 4) {
  if (typeof address !== "string") return String()

  return address.slice(0, size + 2) + "..." + address.slice(-size)
}
