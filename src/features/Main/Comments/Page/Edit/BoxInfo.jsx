import PropTypes from 'prop-types'

const BoxInfo = ({ title, info }) => {
  return (
    <div className="box-info">
      <p className="box-info__title">{title}</p>
      <p className="box-info__name">{info}</p>
    </div>
  )
}

BoxInfo.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
}
BoxInfo.defaultProps = {
  title: '',
  info: '',
}

export default BoxInfo
