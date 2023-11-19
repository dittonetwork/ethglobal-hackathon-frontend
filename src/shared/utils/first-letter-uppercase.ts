export default function firstLetterUppercase(value: string) {
  return value[0].toLocaleUpperCase() + value.slice(1).toLocaleLowerCase()
}