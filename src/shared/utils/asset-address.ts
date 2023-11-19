export default function assetAddress(addr?: string) {
  const _address = (addr ?? String()).toLowerCase().trim()

  return {
    equalTo: (address?: string) => address ? address.toLowerCase().trim() === _address : false,
    lowerThen: (address?: string) => address ? Number(_address) < Number(address) : false,
    greaterThen: (address?: string) => address ? Number(_address) > Number(address) : false,
    inArray: (addresses: string[]) => addresses.map(a => a.toLowerCase().trim()).includes(_address)
  }
}
