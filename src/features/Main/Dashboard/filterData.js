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
    const moth = moment(item.created_at).format('MM')
    const monthNow = moment().format('MM')
    if (moth === monthNow) {
      return item
    } else {
      return flathy
    }
  })
}

export const sumRevenueMonthly = data => {
  const newData = getDataOrderMonth(data)
  let relsu = 0
  newData.forEach(item => {
    relsu += item.intoMeny
  })

  return relsu
}
