import { useState } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { API_NAME, EDIT } from '../../../../dataDefault'
import BoxItemDele from '../../../../Components/BoxItemDele'
import PropTypes from 'prop-types'
import { date } from '../../../../Components/myMonment'
import { fetchOrders } from '../../../../rootReducers/orderSlice'
import { fetchProductDetailOrderAll } from '../../../../rootReducers/productDetailOrderThunk'
import { useDispatch } from 'react-redux'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { customAxiosApi } from '../../../../customAxiosApi'
import moment from 'moment'

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
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { date(text) }
        </Link>
      )
    },
    {
      title: 'userName',
      dataIndex: 'name',
      fixed: 'left',
      width: 120,
      ...useGetColumnSearchProps('name'),
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...useGetColumnSearchProps('phone'),
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 350,
      ...useGetColumnSearchProps('address'),
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Products',
      dataIndex: 'products',
      width: 350,
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          {
            text.map((item, index) => {
              return (
                <p key={index}>
                  { item.name }
                </p>
              )
            })
          }
        </Link>
      )
    },
    {
      title: 'TotalCount',
      dataIndex: 'totalCount',
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'TotalPrice',
      dataIndex: 'totalPrice',
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'trasport',
      dataIndex: 'trasport',
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'intoMeny',
      dataIndex: 'intoMeny',
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Edit',
      dataIndex: 'action',
      fixed: 'right',
      width: 70,
      render: () => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          <Space size="middle">
            <EditOutlined className="icon-edit"/>
          </Space>
        </Link>
      )
    },
  ]

  const handleDeleteSelect = async () => {
    await selectedRowKeys.forEach(item => {
      customAxiosApi.delete(`${API_NAME.ORDERS}/${item.id}`)
      customAxiosApi.delete(`${API_NAME.DETAILORDER}/${item.detailOrderID}`)

      item.products.forEach(product => {
        customAxiosApi.delete(`${API_NAME.PRODUCTDETAILORDER}/${product.productDetailOrderID}`)
      })
    })

    setSelectedRowKeys([])
    await dispatch(fetchOrders())
    await dispatch(fetchProductDetailOrderAll())
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
