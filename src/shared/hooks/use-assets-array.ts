export default function useAssetsArray<T extends unknown[]>(assetsList: T, onUpdate: (assetsList: T) => any, emptyItem: T[0]) {
  const addAsset = (asset?: T[0]) => onUpdate([
    ...assetsList,
    asset ?? emptyItem
  ] as T)

  const deleteAsset = (index: number) => onUpdate(assetsList.filter((_, i) => i !== index) as T)

  const updateAsset = (index: number, data: Partial<T[0]>) => onUpdate(assetsList.map((item, i) => {
    if (i !== index) return item

    return {
      ...item as any,
      ...data
    }
  }) as T)

  const getAsset = (index: number): T[0] => assetsList[index]

  const onlyIfAsset = (index: number, callback: (asset: T[0]) => any) => {
    const asset = getAsset(index)
    if (asset) callback(asset as T[0])
  }

  return {
    addAsset,
    deleteAsset,
    updateAsset,
    getAsset,
    onlyIfAsset,
    assetsList
  }
}