export default function chainsList(chains: ChainId[]) {
  const _array = chains.map(chain => String(chain))

  return {
    contains(value: ChainId) {
      return _array.includes(String(value))
    },

    some(...values: ChainId[]) {
      return _array.some(chain => values.map(v => String(v)).includes(chain))
    }
  }
}