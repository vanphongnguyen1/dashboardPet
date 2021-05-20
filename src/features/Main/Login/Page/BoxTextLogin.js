import React from 'react'

const BoxTextLogin = ({ text = '', className = ''}) => {
  return (
    <div className="modal-login__box">
      <p className={className}>
        { text }
      </p>
    </div>
  )
}

export default BoxTextLogin
