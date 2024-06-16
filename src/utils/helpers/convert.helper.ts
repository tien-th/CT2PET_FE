export function convertSlug(str: string) {
  let string = str
  string = string.toLowerCase()
  string = string.normalize("NFD")
  string = string.replace(/[\u0300-\u036f]/g, "")
  string = string.replace(/[đĐ]/g, "d")
  string = string.replace(/([^0-9a-z-\s])/g, "")
  string = string.replace(/(\s+)/g, "-")
  string = string.replace(/^-+|-+$/g, "")
  return string
}

export const numberWithComma = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
