import EditOrderContent from './EditOrderContent'
import { useSelector } from 'react-redux'
import Loading from '../../../../../Components/Loading'
import { dataGeneral } from './dataGeneral'

const EditOrder = () => {
  const dataOrders = useSelector(state => state.orders)
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder)

  if (dataOrders.loading === 'success' && dataProductDetailOrder.loading === 'success') {
    const initialData = dataGeneral(dataOrders.list, dataProductDetailOrder.list)

    return (
      <>
        <EditOrderContent data={initialData}/>
      </>
    )
  } else {
    return <Loading />
  }
}

export default EditOrder
