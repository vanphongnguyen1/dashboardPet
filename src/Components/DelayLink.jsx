import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'

const DelayLink = props => {
  const {
    replace,
    to,
    delay,
    onDelayStart,
    onDelayEnd,
    onClick,
    className,
    children
  } = props

  const [ isTimeOut, setIsTimeOut] = useState(null)
  const history = useHistory()

  const handleClick = e => {
    onClick()
    onDelayStart(e, to)

    if (e.defaultPrevented) return ;

    e.preventDefault()

    setIsTimeOut(setTimeout(() => {

      if (replace) {
        history.replace(to)

      } else {
        history.push(to)
      }

      onDelayEnd()
    }, delay))
  }

  useEffect(() => {
    return () => clearTimeout(isTimeOut)
	}, [isTimeOut])

  return (
    <>
      <Link
        to={to}
        onClick={handleClick}
        replace={replace}
        className={className}
      >
        { children }
      </Link>
    </>
  )
}

DelayLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
	delay: PropTypes.number,
  replace: PropTypes.bool,

	onDelayStart: PropTypes.func,
	onDelayEnd: PropTypes.func,
	onClick: PropTypes.func,
}

DelayLink.defaultProps = {
  delay: 0,
  onDelayStart: () => {},
  onDelayEnd:   () => {},
  onClick:   () => {},
}

export default DelayLink
