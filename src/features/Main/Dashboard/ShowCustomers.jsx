import Avarta from '../../../Components/Avarta'

const ShowCustomers = () => {
  return (
    <>
      <div className="show-customer">
        <ul className="show-customer__list">
          <li className="show-customer__item">
            <a href="#as" className="show-customer__link">
              <div className="show-customer__link-box">
                <Avarta />
                <div className="show-content">
                  <p className="show-content__user">
                    Phong Nguyen
                  </p>
                </div>
              </div>
            </a>
          </li>
          <li className="show-customer__item">
            <a href="#as" className="show-customer__link">
              <div className="show-customer__link-box">
                <Avarta />
                <div className="show-content">
                  <p className="show-content__user">
                    Phong Nguyen
                  </p>
                </div>
              </div>
            </a>
          </li>
          <li className="show-customer__item">
            <a href="#as" className="show-customer__link">
              <div className="show-customer__link-box">
                <Avarta />
                <div className="show-content">
                  <p className="show-content__user">
                    Phong Nguyen
                  </p>
                </div>
              </div>
            </a>
          </li>
          <li className="show-customer__item">
            <a href="#as" className="show-customer__link">
              <div className="show-customer__link-box">
                <Avarta />
                <div className="show-content">
                  <p className="show-content__user">
                    Phong Nguyen
                  </p>
                </div>
              </div>
            </a>
          </li>
        </ul>

        <div className="show-customer__all">
          Show All
        </div>
      </div>
    </>
  )
}

export default ShowCustomers
