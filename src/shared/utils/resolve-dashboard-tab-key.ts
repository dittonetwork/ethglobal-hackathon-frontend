import { Tab } from "@/shared/components/Tabs"

export default function resolveDashboardTabKey(key: string | undefined, keysList: string[]): Tab {
  const _genTab = (_key: string): Tab => ({
    key: _key,
    value: (_key[0].toUpperCase() + _key.slice(1)).replace(/-/g, " ")
  })

  if (!key) return _genTab(keysList[0])

  if (keysList.includes(key.toLowerCase())) return _genTab(key.toLowerCase())

  return _genTab(keysList[0])
}