import { useState } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { TITLE_MENU, EDIT } from '../../../../dataDefault'
import BoxItemDele from '../../../../Components/BoxItemDele'
import PropTypes from 'prop-types'
import moment from 'moment'

const TableContentTab = ({ data }) => {
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
      // ...useGetColumnSearchProps('name'),
      render: text => (
        <Link
          to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
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
      render: text => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      // width: 50,
      // ...useGetColumnSearchProps('phone'),
      render: text => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 350,
      // ...useGetColumnSearchProps('address'),
      render: text => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
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
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          {
            text.map((item, index) => {
              return (
                <p key={index}>
                  { item }
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
      // width: 50,
      render: text => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          { text }
        </Link>
      )
    },
    {
      title: 'TotalPrice',
      dataIndex: 'totalPrice',
      // width: 60,
      render: text => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          { text }
        </Link>
      )
    },
    {
      title: 'trasport',
      dataIndex: 'trasport',
      // width: 50,
      render: text => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          { text }
        </Link>
      )
    },
    {
      title: 'intoMeny',
      dataIndex: 'intoMeny',
      // width: 60,
      render: text => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
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
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
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
      render: (text, record) => (
        <Link
          // to={`/${TITLE_MENU.USERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          <Space size="middle">
            <EditOutlined className="icon-edit"/>
          </Space>
        </Link>
      )
    },
  ]

  const handleDeleteSelect = () => {
    // selectedRowKeys.forEach(item => {
    //   customAxiosApi.delete(`${url}/${item.id}`)
    //   .then(response => {
    //     console.log(response.data)
    //   })
    // })

    // dispatch(fetchUsers(url))
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
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => dispatch(fetchUsers(`${url}/${record.id}`))
          //   }
          // }}
        />
      </div>
    </>
  )
}

TableContentTab.propTypes = {
  data: PropTypes.array
}

TableContentTab.defaultProps = {
  data: []
}

export default TableContentTab
