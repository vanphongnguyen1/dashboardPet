import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { resetScroll } from './access/logic/resetScroll'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    resetScroll()
  }, [pathname]);

  return null;
}

export default ScrollToTop
