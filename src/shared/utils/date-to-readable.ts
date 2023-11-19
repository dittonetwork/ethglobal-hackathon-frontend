export default function dateToReadable(timestamp: number, time = true, seconds = true) {
  const dateValue = new Date(timestamp).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour12: false
  })

  const timeValue = new Date(timestamp).toLocaleTimeString("en-US", {
    hour12: false,
    hour: time ? "2-digit" : undefined,
    minute: time ? "2-digit" : undefined,
    second: time && seconds ? "2-digit" : undefined
  })

  const [hours, ...etc] = timeValue.split(":")

  if (!time) return dateValue
  return `${ dateValue }, ${ hours === "24" ? "00" : hours }:${ etc.join(":") }`
}