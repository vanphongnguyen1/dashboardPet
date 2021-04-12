export const ID = () => {
  const  [, lastNamber] = Math.random().toString().split('.');
  return Number(lastNamber)
}
