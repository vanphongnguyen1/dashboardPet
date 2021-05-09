import { STATUS_HANDLE } from '../../../../dataDefault'

export const sectionData = (dataOrder, dataProductDetailOrder) => {
  // console.log('aadad', dataOrder);
  // console.log('dataProductDetailOrder', dataProductDetailOrder);

  const dataPending = []
  const dataDelivered = []
  const dataCanselled = []

  dataOrder.forEach(order => {
    const products = []

    dataProductDetailOrder.forEach(item => {
      if (item.detailOrderID === order.detailOrderID) {
        products.push({
          id: item.id,
          name: item.products.name,
          price: item.products.priceSale,

          count: item.count,
          totalPrice: item.count * item.products.priceSale,
        })
      }
    })

    const {
      users,
      detailorder,
      peyment,
      status,
      trasport
    } = order

    const newOrder = {
      id: order.id,
      name: users.name,
      phone: users.phone,
      address: users.address,
      avarta: users.avarta,

      products,

      totalCount: detailorder.count,
      totalPrice: detailorder.price,
      intoMeny: order.intoMeny,

      trasport: trasport.price,
      status: status.name,
      peyment: peyment.name,

      trasportID: order.trasportID,
      statusID: order.statusID,
      detailOrderID: order.detailOrderID,
      peymentID: order.peymentID,
      usersID: order.usersID,

      created: order.created_at,
      updated: order.updated_at,
    }

    if (newOrder.status === STATUS_HANDLE.PENDING) {
      dataPending.push(newOrder)
    }

    if (newOrder.status === STATUS_HANDLE.DELIVERED) {
      dataDelivered.push(newOrder)
    }

    if (newOrder.status === STATUS_HANDLE.CANCELLED) {
      dataCanselled.push(newOrder)
    }
  })

  if (dataOrder.length === 1) {
    if (dataPending.length === 1) {
      console.log('232', dataPending);
      return dataPending
    }

    if (dataDelivered.length === 1) {
      return dataDelivered
    }

    if (dataCanselled.length === 1) {
      return dataCanselled
    }

  }

  return [
    dataPending,
    dataDelivered,
    dataCanselled
  ]
}
