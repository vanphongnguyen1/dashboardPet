import RootPaper from './RootPaper'
import PendingOrder from './PendingOrder'
import ShowReviews from './ShowReviews'
import ShowCustomers from './ShowCustomers'
import { Tablet } from '../../../Components/responsive'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__row">
        <div className="dashboard__box box-md-5 box-sm-12">
          <div className="dashboard__row">
            <div className="box-half">
              <RootPaper icon="far fa-dollar-sign" title="Monthly Revenue" subTotal="10000"/>
            </div>

            <div className="box-half">
              <RootPaper icon="fas fa-shopping-cart" title="New Orders" subTotal="14"/>
            </div>
          </div>

          <PendingOrder/>
        </div>

        <Tablet>
          <div className="dashboard__box box-md-7">
            <div className="dashboard__row">
              <div className="dashboard__box">
                <div className="box-big">
                  <RootPaper icon="fas fa-comment-alt-lines" title="New Comments" subTotal="3"/>
                  <ShowReviews/>
                </div>
              </div>

              <div className="dashboard__box">
                <div className="box-big">
                  <RootPaper icon="fas fa-users-medical" title="New Customers" subTotal="11"/>
                  <ShowCustomers/>
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
