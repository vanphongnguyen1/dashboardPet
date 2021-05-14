import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import moment from 'moment'

const MyLineChart = () => {
  const days = Array.from(
    { length: moment().daysInMonth() },
    (x, i) => moment('04-01-2021').startOf('month').add(i, 'days').format('DD-MM')
  )

  const dataOrder = useSelector(state => state.orders.list)

  const year = moment().format('YYYY')

  const newData = useMemo(() => {
    const dayOrders = []

    days.forEach(day => {
      let totalMeny = 0

      dataOrder.forEach(item => {
        const dayOrder = moment(item.created_at).format('DD-MM')

        if (day === dayOrder) {
          totalMeny += item.intoMeny
        }
      })

      const thousandMeny = Number(String(totalMeny).slice(0, String(totalMeny).length - 3))

      dayOrders.push({
        day: `${day}-${year}`,
        thousandMeny,
      })
    })

    return dayOrders

  }, [dataOrder, days, year])

  return (
    <div className="my-chart">
      {/* <LineChart width={610} height={300} data={newData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="thousandMeny" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip/>
      </LineChart> */}

      <AreaChart width={610} height={300} data={newData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="day" />
        <YAxis dataKey="thousandMeny"/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="thousandMeny" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
      </AreaChart>
    </div>
  )
}

export default MyLineChart
