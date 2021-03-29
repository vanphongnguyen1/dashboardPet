export const useSectionData = (dataOrder, dataProductDetailOrder) => {
  const dataPending = []
  const dataDelivered = []
  const dataCanselled = []

  dataOrder.forEach( order => {
    const names = []

    dataProductDetailOrder.forEach(item => {

      if (item.detailOrderID === order.detailOrderID) {
        names.push(item.products.name)
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

      products : names,    //detailOrderID: 1,
      count: detailorder.count,
      price: detailorder.price,

      totalCount: order.totalCount,
      totalPrice: order.totalPrice,
      intoMeny: order.intoMeny,

      trasport: trasport.name,
      peyment: peyment.name,
      trasportPrice: trasport.price,
      status: status.name,

      created: order.created_at,
      updated: order.updated_at,
    }

    if (newOrder.status === 'pending') {
      dataPending.push(newOrder)
    }

    if (newOrder.status === 'delivered') {
      dataDelivered.push(newOrder)
    }

    if (newOrder.status === 'cancelled') {
      dataCanselled.push(newOrder)
    }
  })

  return [
    dataPending,
    dataDelivered,
    dataCanselled
  ]
}
