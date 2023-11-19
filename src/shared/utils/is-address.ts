export default function isAddress(value: string | undefined) {
  if (!value || value.length < 3 || value.replace(/[^0-9A-z:]/g, "").length !== value.length) return false

  if (value.length !== 42) return false
  return value.slice(0, 2).toLowerCase() === "0x"
}