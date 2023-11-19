export default function resolveUrl(url: any) {
  const value = (() => {
    if (typeof url !== "string") return ""

    if (url.slice(0, "/public/icons/".length) === "/public/icons/") return url

    if (/http(s?):\/\//.test(url)) return url

    return `/public/icons/${ url }`
  })()

  if (!value) return value

  if (value.split(".").length < 2) return `${ value }.png`

  return value
}