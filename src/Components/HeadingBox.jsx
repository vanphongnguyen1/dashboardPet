import PropTypes from 'prop-types'

export const HeadingBox = ({ title }) => {
  return <p className="heading">{title}</p>
}

export const SubHeading = ({ title }) => {
  return <p className="sub-heading">{title}</p>
}

HeadingBox.propTypes = {
  title: PropTypes.string,
}
HeadingBox.defaultProps = {
  title: '',
}

SubHeading.propTypes = {
  title: PropTypes.string,
}
SubHeading.defaultProps = {
  title: '',
}
