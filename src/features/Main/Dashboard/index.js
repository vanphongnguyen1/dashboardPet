import RootPaper from './RootPaper'
import PendingOrder from './PendingOrder'
import ShowComments from './ShowComments'
import ShowCustomers from './ShowCustomers'
import { Tablet } from '../../../Components/responsive'
import { useSelector } from 'react-redux'
import { filterDataComments, filterDataOrders, sumRevenueMonthly } from './filterData'
import { TITLE_MENU } from '../../../dataDefault'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const dataOrders = useSelector(state => state.orders.list)
  const dataComments = useSelector(state => state.comments.list)
  const dataUsers = useSelector(state => state.users.list)

  const [dataPendingComments, dataPendingCommentsLength] = filterDataComments(dataComments)
  const [dataPendingOrders, dataPendingOrdersLength] = filterDataOrders(dataOrders)
  const revenueMonthly = sumRevenueMonthly(dataOrders)

  return (
    <div className="dashboard">
      <div className="dashboard__row">
        <div className="dashboard__box box-md-5 box-sm-12">
          <div className="dashboard__row">
            <Link className="box-half" to={TITLE_MENU.ORDERS}>
              <RootPaper
                icon="far fa-dollar-sign"
                title="Monthly Revenue"
                subTotal={revenueMonthly}
              />
            </Link>

            <Link className="box-half" to={TITLE_MENU.ORDERS}>
              <RootPaper
                icon="fas fa-shopping-cart"
                title="New Orders"
                subTotal={dataPendingOrdersLength}
              />
            </Link>
          </div>

          {
            dataPendingOrdersLength
            ? <PendingOrder data={dataPendingOrders}/>
            : ''
          }
        </div>

        <Tablet>
          <div className="dashboard__box box-md-7">
            <div className="dashboard__row">
              <div className="dashboard__box">
                <div className="box-big">
                  <Link to={TITLE_MENU.COMMENTS} className="link-page">

                    <RootPaper
                      icon="fas fa-comment-alt-lines"
                      title="New Comments"
                      subTotal={dataPendingCommentsLength}
                    />
                  </Link>

                  {
                    dataPendingCommentsLength
                      ? <ShowComments data={dataPendingComments}/>
                      : ''
                  }
                </div>
              </div>

              <div className="dashboard__box">
                <div className="box-big">
                  <Link to={TITLE_MENU.USERS} className="link-page">

                    <RootPaper
                      icon="fas fa-users-medical"
                      title="Customers"
                      subTotal={dataUsers.length}
                    />
                  </Link>

                  {
                    dataUsers.length
                      ? <ShowCustomers data={dataUsers}/>
                      : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </Tablet>
      </div>
    </div>
  )
}

export default Dashboard
