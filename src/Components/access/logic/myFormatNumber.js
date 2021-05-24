
export const myFormatNumber = num => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(num)
}
