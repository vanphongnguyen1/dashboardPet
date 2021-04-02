import { useState } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { TITLE_MENU, EDIT } from '../../../../dataDefault'
import BoxItemDele from '../../../../Components/BoxItemDele'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fetchOrders, setOrder } from '../../../../rootReducers/orderSlice'
import { fetchProductDetailOrder } from '../../../../rootReducers/productDetailOrderThunk'
import { useDispatch } from 'react-redux'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { customAxiosApi } from '../../../../customAxiosApi'

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
      render: text => (
        <Link
          to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { moment(text).format("DD-MM-YYYY") }
        </Link>
      )
    },
    {
      title: 'userName',
      dataIndex: 'name',
      fixed: 'left',
      width: 120,
      ...useGetColumnSearchProps('name'),
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
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
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
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
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
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
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
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
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'TotalPrice',
      dataIndex: 'totalPrice',
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'trasport',
      dataIndex: 'trasport',
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { text }
        </Link>
      )
    },
    {
      title: 'intoMeny',
      dataIndex: 'intoMeny',
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
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
      render: text => (
        <Link
          to={`/${url}/${EDIT.toLowerCase()}`}
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
      customAxiosApi.delete(`/orders/${item.id}`)
      customAxiosApi.delete(`/detailOrder/${item.detailOrderID}`)

      item.products.forEach(product => {
        customAxiosApi.delete(`/productDetailOrder/${product.productDetailOrderID}`)
      })
    })

    setSelectedRowKeys([])
    await dispatch(fetchOrders(url))
    await dispatch(fetchProductDetailOrder('productDetailOrder'))
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
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                dispatch(setOrder(record))
              }
            }
          }}
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
