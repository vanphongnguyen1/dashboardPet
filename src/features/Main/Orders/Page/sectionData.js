const sectionData = dataOrder => {
  const dataPending = []
  const dataDelivered = []
  const dataCanselled = []

  dataOrder.forEach(order => {
    const {
      users,
      detailorder,
      peyment,
      status,
      trasport
    } = order

    // customAxiosApi.get(`/productDetailOrder?detailOrderID=${order.detailOrderID}`)
    //   .then(response => {
    //     const { data } = response.data
    //     const names = []

    //     data.forEach(item => {
    //       names.push(item.products.name)
    //     })

    //     setNameProducts(names)
    //   })

    const newOrder = {
      id: order.id,
      name: users.name,
      phone: users.phone,
      address: users.address,

      products : [],    //detailOrderID: 1,
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

export default sectionData
