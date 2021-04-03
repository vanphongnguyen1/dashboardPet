import PropTypes from 'prop-types'

const PupoSubText = ({ title }) => {
  return (
    <span className="popu-subtext">
      { title }
    </span>
  )
}

PupoSubText.propTypes = {
  title: PropTypes.string
}

PupoSubText.defaultProps = {
  title: ''
}

export default PupoSubText
