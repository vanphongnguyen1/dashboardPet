import Avarta from '../../Avarta'
const PendingOrder = () => {
  return (
    <>
      <div className="pending-order">
        <h2 className="pending-order__heading">
          Pending Orders
        </h2>

        <ul className="pending-order__list">
          <li className="pending-order__item">
            <a href="#a" className="pending-order__link">
              <div className="info-order">
                <div className="info-order__user">
                  <Avarta/>

                  <div className="info-order__detail">
                    <span className="info-order__detail--date">
                      16/03/2021, 20:45PM
                    </span>
                    <span className="info-order__detail--customer">
                      mua bởi Nguyễn Văn Phong, 3 sản phẩm
                    </span>
                  </div>
                </div>
                <div className="info-order__meny">1000000</div>
              </div>
            </a>
          </li>

          <li className="pending-order__item">
            <a href="#a" className="pending-order__link">
              <div className="info-order">
                <div className="info-order__user">
                  <Avarta/>

                  <div className="info-order__detail">
                    <span className="info-order__detail--date">
                      16/03/2021, 20:45PM
                    </span>
                    <span className="info-order__detail--customer">
                      mua bởi Nguyễn Văn Phong, 3 sản phẩm
                    </span>
                  </div>
                </div>
                <div className="info-order__meny">1000000</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default PendingOrder
