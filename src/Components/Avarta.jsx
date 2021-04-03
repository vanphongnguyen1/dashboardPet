import PropTypes from 'prop-types'
import ava from './access/upload/itMe.jpg'

const Avarta = ({ avarta, name }) => {
  const fristChar = name.slice(0,1)

  return (
    <span className="avarta">
        {
          avarta
            ? <img src={ava} alt="s" className="avarta__img" />
            : <span className="avarta__text">{ fristChar.toUpperCase() }</span>
        }
    </span>
  )
}

Avarta.propTypes = {
  avarta: PropTypes.string,
  name: PropTypes.string
}

Avarta.defaultProps = {
  avarta: '',
  name: ''
}

export default Avarta
