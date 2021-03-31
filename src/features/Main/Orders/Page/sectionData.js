export const sectionData = (dataOrder, dataProductDetailOrder) => {
  const dataPending = []
  const dataDelivered = []
  const dataCanselled = []

  dataOrder.forEach( order => {
    const products = []

    dataProductDetailOrder.forEach(item => {
      if (item.detailOrderID === order.detailOrderID) {
        products.push({
          ...item.products,
          productDetailOrderID: item.id
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

      products,
      totalCount: detailorder.count,
      totalPrice: detailorder.price,
      intoMeny: order.intoMeny,

      trasport: trasport.price,
      peyment: peyment.name,
      trasportPrice: trasport.price,
      status: status.name,

      detailOrderID: order.detailOrderID,

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
