import React from 'react'
import { PoweroffOutlined } from '@ant-design/icons'
import { NavLink, useHistory } from 'react-router-dom'
import { deleteTokenLogOut } from '../rootReducers/loginSlice'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

const PoPoverHeader = ({ isPopover }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(deleteTokenLogOut(false))

    history.replace("/")
  }
  return (
    <div className={`popover  ${isPopover ? 'translate-scale' : ''}`}>
      <NavLink
        className="popover__link"
        to="/configuration"
        activeClassName="active-nav"
      >
        <span className="popover__link--icon fas fa-cog" />

        <span className="popover__link--text">Configuration</span>
      </NavLink>

      <div className="popover__link" onClick={handleLogOut}>
        <PoweroffOutlined className="popover__link--icon"/>

        <span className="popover__link--text">LogOut</span>
      </div>
    </div>
  )
}

PoPoverHeader.propTypes = {
  isPopover: PropTypes.bool
}

PoPoverHeader.defaultProps = {
  isPopover: false
}

export default PoPoverHeader
