
const Products = () => {
  // const data = "<li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>"
  // const newData = data.split(',')
  /* { newData.map(item => {
        return <div className="editor" dangerouslySetInnerHTML={{__html:item}}/>
      })} */
  return (
    <div className="product">
      <div className="box-row">
        <div className="box-3">
          <div className="product-menu">
            <h1>Menu</h1>
          </div>
        </div>

        <div className="box-9">
          <div className="box-row">
            <div className="box-4">
              <div className="product-box">

              </div>
            </div>
            <div className="box-4">
              <div className="product-box">

              </div>
            </div>
            <div className="box-4">
              <div className="product-box">

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Products
