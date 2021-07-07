import { useState } from 'react'
import { Table, Button } from 'antd'
import { Link } from 'react-router-dom'
import { API_NAME, EDIT } from '../../../../dataDefault'
import BoxItemDele from '../../../../Components/BoxItemDele'
import { openMessage } from '../../../../Components/openMessage'
import PropTypes from 'prop-types'
import { date } from '../../../../Components/myMonment'
import { fetchOrders } from '../../../../rootReducers/orderSlice'
import { fetchProductDetailOrderAll } from '../../../../rootReducers/productDetailOrderThunk'
import { useDispatch } from 'react-redux'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { myFormatNumber } from '../../../../Components/access/logic/myFormatNumber'
import { customAxiosApi } from '../../../../customAxiosApi'
import moment from 'moment'
import { hideLoading, showLoading} from 'react-redux-loading-bar'

const TableContentTab = ({ data, url }) => {
  const dispatch = useDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectChange = (index, item) => {
    setSelectedRowKeys(item)
  }

  const rowSelection = {
    onChange: onSelectChange,
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'updated',
      fixed: 'left',
      width: 100,
      sorter: {
        compare: (a, b) => moment(a.updated).format('x') - moment(b.updated).format('x'),
      },
      render: (text, record) => (
        <p className="antd-link">
          { date(text) }
        </p>
      )
    },
    {
      title: 'userName',
      dataIndex: 'name',
      fixed: 'left',
      width: 120,
      ...useGetColumnSearchProps('name'),
      render: (text, record) => (
        <p className="antd-link">
          { text }
        </p>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...useGetColumnSearchProps('phone'),
      render: (text, record) => (
        <p className="antd-link">
          { text }
        </p>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 350,
      ...useGetColumnSearchProps('address'),
      render: (text, record) => (
        <p className="antd-link">
          { text }
        </p>
      )
    },
    {
      title: 'Products',
      dataIndex: 'products',
      width: 350,
      render: (text, record) => (
        <div className="antd-link">
          {
            text.map((item, index) => {
              return (
                <p key={index}>
                  { item.name }
                </p>
              )
            })
          }
        </div>
      )
    },
    {
      title: 'TotalCount',
      dataIndex: 'totalCount',
      render: (text, record) => (
        <p className="antd-link">
          { text }
        </p>
      )
    },
    {
      title: 'TotalPrice',
      dataIndex: 'totalPrice',
      render: (text, record) => (
        <p className="antd-link">
          { myFormatNumber(text) }
        </p>
      )
    },
    {
      title: 'trasport',
      dataIndex: 'trasport',
      render: (text, record) => (
        <p className="antd-link">
          { myFormatNumber(text) }
        </p>
      )
    },
    {
      title: 'intoMeny',
      dataIndex: 'intoMeny',
      render: (text, record) => (
        <p className="antd-link">
          { myFormatNumber(text) }
        </p>
      )
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <p className="antd-link">
          { text }
        </p>
      )
    },
    {
      title: 'Edit',
      dataIndex: 'action',
      fixed: 'right',
      width: 70,
      render: (text, record) => (
          <Link
            to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
            className="antd-link"
          >
            <Button type="primary">Edit</Button>
          </Link>
      )
    },
  ]

  const handleDeleteSelect = async () => {
    dispatch(showLoading('sectionBar'))

    for (let item of selectedRowKeys) {
      const { id,  detailOrderID, products } = item
      await customAxiosApi.delete(`${API_NAME.DETAILORDER}/${detailOrderID}`)
      await customAxiosApi.delete(`${API_NAME.ORDERS}/${id}`)

      for (let product of products) {
        await customAxiosApi.delete(`${API_NAME.PRODUCTDETAILORDER}/${product.productDetailOrderID}`)
      }
    }

    setSelectedRowKeys([])
    openMessage('Delete Success!')
    await dispatch(fetchOrders())
    await dispatch(fetchProductDetailOrderAll())
    await dispatch(hideLoading('sectionBar'))
  }

  return (
    <>
      <div className="table-pendding">
        <BoxItemDele
          items={selectedRowKeys}
          onClick={handleDeleteSelect}
        />

        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={data.length > 10}
          scroll={{ x: 1700 }}
        />
      </div>
    </>
  )
}

TableContentTab.propTypes = {
  data: PropTypes.array,
  url: PropTypes.string
}

TableContentTab.defaultProps = {
  data: [],
  url: ''
}

export default TableContentTab
