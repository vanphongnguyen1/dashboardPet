export const dataGeneral = (order, productDetailOrder) => {
  const products = []
  let sumPriceProduct = 0
  let sumCount = 0

  productDetailOrder.forEach(item => {
    products.push({
      id: item.id,
      name: item.products.name,
      price: item.products.price,

      count: item.count,
      totalPrice: item.count * item.products.price,
    })
  })

  if (products.length > 0) {
    products.forEach(product => {
      sumPriceProduct += product.totalPrice
      sumCount += product.count
    })
  }

  const {
    users,
    peyment,
    trasport
  } = order

  const initial = {
    user: {
      id: users.id,
      name: users.name,
      phone: users.phone,
      address: users.address,
    },

    order: {
      detailOrderID: order.detailOrderID,
      id: order.id,
      status: order.statusID,
      date: order.updated_at,

      trasport: order.trasportID,
      peyment: order.peymentID,
    },

    products,

    totals: {
      id: order.id,
      totalCount: sumCount,
      totalPrice: sumPriceProduct,
      peyment: peyment.name,
      trasport: trasport.price,
      intoMeny: sumPriceProduct + trasport.price
    }
  }

  return initial
}
