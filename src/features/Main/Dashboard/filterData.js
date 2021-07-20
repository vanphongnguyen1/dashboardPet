import moment from 'moment'
import { STATUS_HANDLE } from '../../../dataDefault'

export const filterDataComments = data => {
  const resultData = data.filter(item => item.status_comments.name === STATUS_HANDLE.PENDING)
  return [resultData, resultData.length]
}

export const filterDataOrders = data => {
  const resultData = data.filter(item => item.status.name === STATUS_HANDLE.PENDING)
  return [resultData, resultData.length]
}

export const getDataOrderMonth = data => {
  const flathy = false

  return data.filter(item => {
    const moth = moment(item.updated_at).format('MM')
    const monthNow = moment().format('MM')
    if (moth === monthNow) {
      return item
    } else {
      return flathy
    }
  })
}

export const sumRevenueMonthly = data => {
  // const days = Array.from(
  //   { length: moment().daysInMonth() },
  //   (x, i) => moment('01-07-2021', 'DD-MM-YYYY').startOf('month').add(i, 'days').format('DD-MM')
  // )

  const newData = getDataOrderMonth(data)
  let relsu = 0
  newData.forEach(item => {
    if (item.status.name === 'delivered') {
      relsu += item.intoMeny
    }
  })

  return relsu
}
