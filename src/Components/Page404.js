import React from 'react'
import { useHistory } from 'react-router-dom'
import './page404.scss'

const Page404 = () => {
  const history = useHistory()

  return (
    <>
      <div className="page-404">
        <div className="page-404__box">
          <span className="page-404__box--icon far fa-frown" />
          <h3 className="page-404__box--title">404</h3>
          <h6 className="page-404__box--title-sub">Page not found</h6>
          <p className="page-404__box--text">
            The Page you are looking for doesn't exist or an other error
            occurred.
          </p>
          <span className="btn--back-home" onClick={() => history.push('/')}>
            Back Home
          </span>
        </div>
      </div>
    </>
  )
}

export default Page404
