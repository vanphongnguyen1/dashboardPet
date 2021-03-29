import { InputNumber } from 'antd'

const TableItem = () => {
  return (
    <div className="table">
      <div className="table__item">
        <div className="table__tr">
          <p className="table__th--name">Name</p>
          <p className="table__th--price">Price</p>
          <p className="table__th--count">Count</p>
          <p className="table__th--totalPrice">TotalPrice</p>
          <p className="table__th--action">Action</p>
        </div>

        <div className="table__tr">
          <p className="table__td--name">mew mew mew mew</p>
          <p className="table__td--price">50000</p>
          <p className="table__td--count">
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              // onChange={onChange}
            />
          </p>
          <p className="table__td--totalPrice">100000</p>
          <p className="table__td--action">Delete</p>
        </div>
      </div>
    </div>
  )
}

export default TableItem
