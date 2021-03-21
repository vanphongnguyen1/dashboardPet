import { useState, useEffect } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import { url } from '../../../url'
import { Create } from '../../Btn'
import BoxItemDele from '../../BoxItemDele'
import { CUSTOMERS, EDIT, CREACT} from '../../../dataDefault'
import { useGetColumnSearchProps } from '../../access/logic/searchColumn'
import { Link } from 'react-router-dom'

const Users = () => {
  const init = [];
  const [data, setData] = useState(init)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    axios.get(`${url}/users`).then(response => {
      const { data } = response.data
      setData(data)
    })
  }, [])

  const onSelectChange = (index, item) => {
    setSelectedRowKeys(item)
  }

  const rowSelection = {
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      ...useGetColumnSearchProps('name'),
      render: text => (
        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      render: text => (
        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${EDIT.toLowerCase()}`}
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
      width: '15%',
      ...useGetColumnSearchProps('phone'),
      render: text => (
        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${EDIT.toLowerCase()}`}
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
      width: '35%',
      ...useGetColumnSearchProps('address'),
      render: text => (
        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${EDIT.toLowerCase()}`}
          className="antd-link"
          // exact
        >
          { text }
        </Link>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '5%',
      render: text => (
        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${EDIT.toLowerCase()}`}
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
      width: '10%',
      render: (text, record) => (
        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${EDIT.toLowerCase()}`}
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

  const onClickRow = record => {
    console.log('-------record',record)
  }

  return (
    <div className="users">
      <div className="box-btn">
        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${CREACT.toLowerCase()}`}
          className="box-btn--link"
        >
          <Create />
        </Link>

        <Link
          to={`/${CUSTOMERS.toLowerCase()}/${CREACT.toLowerCase()}`}
          className="box-btn--link"
        >
          <Create />
        </Link>
      </div>

      <BoxItemDele items = {selectedRowKeys}/>
      <Table
        rowKey="id"
        rowSelection={{...rowSelection}}
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => onClickRow(record)
          }
        }}
        />
    </div>
  )
}

export default Users
