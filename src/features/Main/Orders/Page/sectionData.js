import { STATUS_HANDLE } from '../../../../dataDefault'

export const sectionData = (dataOrder, dataProductDetailOrder, dataCarts) => {
  const dataPending = []
  const dataDelivered = []
  const dataCanselled = []

  dataOrder.forEach((order) => {
    const products = []
    const dataOrdersUser = dataCarts.find((item) => item.id === order.cartID)

    dataProductDetailOrder.forEach((item) => {
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

    const { detailorder, peyment, status, trasport } = order

    const { users } = dataOrdersUser

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
      cartID: order.cartID,

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
      return dataPending
    }

    if (dataDelivered.length === 1) {
      return dataDelivered
    }

    if (dataCanselled.length === 1) {
      return dataCanselled
    }
  }

  return [dataPending, dataDelivered, dataCanselled]
}
