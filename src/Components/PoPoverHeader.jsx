import React from 'react'
import { PoweroffOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const PoPoverHeader = ({ isPopover }) => {
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

      <div className="popover__link">
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
