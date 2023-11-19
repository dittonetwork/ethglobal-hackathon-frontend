import { Location } from "react-router-dom"

export default function compareUrl(path: string, location: Location) {
  const _len = path.length

  if (_len < 2) return false

  return location.pathname.slice(0, _len) === path
}