
const RootPaper = props => {
  const { icon, title, subTotal } = props
  return (
    <>
      <div className="rootPaper">
        <div className="rootPaper__box">
          <div className="rootPaper__box--bg-icon" />
          <span className={`rootPaper__box--icon ${icon}`} />
        </div>

        <div className="rootPaper__box">
          <h4 className="rootPaper__box--title">
            { title }
          </h4>
          <p className="rootPaper__box--sub-total">
            { subTotal }
          </p>
        </div>
      </div>
    </>
  )
}

export default RootPaper
