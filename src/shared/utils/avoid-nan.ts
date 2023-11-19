export default function avoidNan(value: string | undefined | null, replacer = "0.00") {
  if (!value) return replacer

  return value.toLowerCase().trim() === "nan" ? replacer : value
}