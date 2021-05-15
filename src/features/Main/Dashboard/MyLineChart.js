import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import moment from 'moment'

const MyLineChart = () => {
  const days = Array.from(
    { length: moment().daysInMonth() },
    (x, i) => moment('01-04-2021', 'DD-MM-YYYY').startOf('month').add(i, 'days').format('DD-MM')
  )

  const dataOrder = useSelector(state => state.orders.list)

  const year = moment().format('YYYY')

  const dataChart = useMemo(() => {
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

    // return dayOrders

    return [
      {
        day: '01-04-2021',
        thousandMeny: 20000
      },
      {
        day: '02-04-2021',
        thousandMeny: 550000
      },
      {
        day: '03-04-2021',
        thousandMeny: 2000000
      },
      {
        day: '04-04-2021',
        thousandMeny: 2000700
      },
      {
        day: '05-04-2021',
        thousandMeny: 100
      },
      {
        day: '06-04-2021',
        thousandMeny: 123456
      },
      {
        day: '07-04-2021',
        thousandMeny: 186054
      },
      {
        day: '08-04-2021',
        thousandMeny: 3364464
      },
      {
        day: '09-04-2021',
        thousandMeny: 879651
      },
      {
        day: '10-04-2021',
        thousandMeny: 21236984
      },
      {
        day: '11-04-2021',
        thousandMeny: 78979
      },
      {
        day: '12-04-2021',
        thousandMeny: 123123
      },
      {
        day: '13-04-2021',
        thousandMeny: 345435
      },
      {
        day: '14-04-2021',
        thousandMeny: 654345
      },
      {
        day: '15-04-2021',
        thousandMeny: 100
      },
      {
        day: '16-04-2021',
        thousandMeny: 123456
      },
      {
        day: '17-04-2021',
        thousandMeny: 186054
      },
      {
        day: '18-04-2021',
        thousandMeny: 3364464
      },
      {
        day: '19-04-2021',
        thousandMeny: 879651
      },
      {
        day: '20-04-2021',
        thousandMeny: 88979
      },
      {
        day: '21-04-2021',
        thousandMeny: 20000
      },
      {
        day: '22-04-2021',
        thousandMeny: 550000
      },
      {
        day: '23-04-2021',
        thousandMeny: 2000000
      },
      {
        day: '24-04-2021',
        thousandMeny: 2000700
      },
      {
        day: '25-04-2021',
        thousandMeny: 100
      },
      {
        day: '26-04-2021',
        thousandMeny: 123456
      },
      {
        day: '27-04-2021',
        thousandMeny: 186054
      },
      {
        day: '28-04-2021',
        thousandMeny: 3364464
      },
      {
        day: '29-04-2021',
        thousandMeny: 879651
      },
      {
        day: '30-04-2021',
        thousandMeny: 21236984
      },
    ]

  }, [dataOrder, days, year])

  return (
    <div className="my-chart">
      <AreaChart width={610} height={300} data={dataChart}
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
