const HistoryUser = () => {
  return (
    <div className="history">
      <p className="history__title">
        History
      </p>

      <div className="box-row">
        <div className="box-6">
          <span className="history__box">
            <span className="history__box--icon far fa-clock" />
            <span className="history__box-text">
              <span className="history__box-text--text">First seen</span>
              <span className="history__box-text--date">20/3/2021</span>
            </span>
          </span>
        </div>
        <div className="box-6">
          <span className="history__box">
            <span className="history__box--icon far fa-clock" />
            <span className="history__box-text">
              <span className="history__box-text--text">Last seen</span>
              <span className="history__box-text--date">20/3/2021</span>
            </span>
          </span>
        </div>
        <div className="box-6">
          <span className="history__box">
            <span className="history__box--icon far fa-dollar-sign" />
            <span className="history__box-text">
              <span className="history__box-text--text">2 orders</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default HistoryUser
