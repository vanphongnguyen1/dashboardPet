import React from 'react'

const Totals = () => {
  return (
    <div className="totals">
      <div className="table">
        <div className="table__tr">
          <p className="table__td--name">Sum</p>
          <p className="table__td--price">1000000</p>
        </div>
        <div className="table__tr">
          <p className="table__td--name">Trasport</p>
          <p className="table__td--price">25000</p>
        </div>
        <div className="table__tr">
          <p className="table__td--name">Total</p>
          <p className="table__td--price">1025000</p>
        </div>
      </div>
    </div>
  )
}

export default Totals
