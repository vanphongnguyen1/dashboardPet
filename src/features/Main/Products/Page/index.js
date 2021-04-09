import EditProduct from './Edit'

const Products = () => {
  // const data = "<li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>"
  // const newData = data.split(',')
  return (
    <div>
      <EditProduct />
      {/* { newData.map(item => {
        return <div className="editor" dangerouslySetInnerHTML={{__html:item}}/>
      })} */}
    </div>
  )
}

export default Products
