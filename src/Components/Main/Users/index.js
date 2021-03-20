import { useState, useEffect } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import { url } from '../../../url'
import { Create } from '../../Btn'
import BoxItemDele from '../../BoxItemDele'
import { useGetColumnSearchProps } from '../../access/logic/searchColumn'

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
        ...useGetColumnSearchProps('name')
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        width: '15%',
        ...useGetColumnSearchProps('phone')
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: '35%',
        ...useGetColumnSearchProps('address')
      },
      {
        title: 'Role',
        dataIndex: 'role',
        width: '5%',
      },
      {
        title: 'Edit',
        dataIndex: 'action',
        width: '10%',
        render: (text, record) => (
          <>
          <Space size="middle">
            <EditOutlined className="icon-edit" onClick={() => onClickRow(record)}/>
          </Space>
        </>
        )
      },
    ]

    const onClickRow = (record) => {
      console.log('-------record',record)
      // console.log( '-------------index',index)
    }

  return (
    <div className="users">
        <div className="box-btn">
          <a href="#a " className="box-btn--link">
            <Create />
          </a>
          <a href="#a" className="box-btn--link">
            <Create />
          </a>
        </div>

        <BoxItemDele items = {selectedRowKeys}/>
        <Table
          rowKey="id"
          rowSelection={{...rowSelection}}
          columns={columns}
          dataSource={data}
          />
    </div>
  )
}

export default Users
