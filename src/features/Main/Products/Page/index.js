import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import MenuProduct from './MenuProduct'
import ShowItemProduct from './ShowItemProduct'

const Products = () => {
  const { TabPane } = Tabs

  const dataGroup = useSelector(state => state.groups.list)
  // const data = "<li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>"
  // const newData = data.split(',')
  /* { newData.map(item => {
        return <div className="editor" dangerouslySetInnerHTML={{__html:item}}/>
      })} */

  return (
    <div className="product">
        <Tabs defaultActiveKey="1" centered>
          {
            dataGroup.length
              ? dataGroup.map(item => (
                  <TabPane tab={ item.name.toUpperCase() } key={ item.id }>
                    <div className="box-row">
                      <div className="box-3">
                        <MenuProduct id={ item.id } />
                      </div>

                      <div className="box-9">
                        <div className="list-product">
                          <div className="box-row">
                            <ShowItemProduct />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                ))
              : ''
          }
        </Tabs>
    </div>
  )
}

export default Products
