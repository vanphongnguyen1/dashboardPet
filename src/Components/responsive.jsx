import { useMediaQuery } from 'react-responsive'

// const Desktop = ({ children }) => {
//   const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1024 })
//   return isDesktop ? children : null
// }
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ maxWidth: 991 })
  return !isTablet ? children : null
}
// const Mobile = ({ children }) => {
//   const isMobile = useMediaQuery({ maxWidth: 767 })
//   return isMobile ? children : null
// }
// const Default = ({ children }) => {
//   const isNotMobile = useMediaQuery({ minWidth: 768 })
//   return isNotMobile ? children : null
// }
