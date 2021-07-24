import PropTypes from 'prop-types'

export const BtnCreatExport = ({ icon, title }) => {
  return (
    <span className="btn__create">
      <span className={`btn__create--icon ${icon}`} />
      <span className="btn__create--text">{title}</span>
    </span>
  )
}

export const Delete = () => {
  return (
    <div className="btn__delete">
      <span className="btn__delete--icon fas fa-trash" />
      <span className="btn__delete--text">delete</span>
    </div>
  )
}
export const Cancell = () => {
  return (
    <div className="btn__cancell">
      <span className="btn__cancell--text">Cancell</span>
    </div>
  )
}

export const Save = () => {
  return (
    <span className="btn__save">
      <span className="btn__save--icon fas fa-save" />
      <span className="btn__save--text">Save</span>
    </span>
  )
}

export const BtnLogin = () => {
  return (
    <div className="btn__login">
      <p className="btn__login--text">Sign In</p>
    </div>
  )
}

BtnCreatExport.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
}

BtnCreatExport.defaultProps = {
  icon: '',
  title: '',
}
