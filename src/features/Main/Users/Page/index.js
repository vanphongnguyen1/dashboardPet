import { useState, useEffect } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Create } from '../../../../Components/Btn'
import BoxItemDele from '../../../../Components/BoxItemDele'
import { EDIT, CREAT} from '../../../../dataDefault'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, setUser } from '../../../../rootReducers/userSlice'
import { customAxiosApi }  from '../../../../customAxiosApi'

const Users = ({ match }) => {

  const url = match.url.slice(1)
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsers(url))
  }, [dispatch, url])

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const dataUsers = useSelector(state => state.users)

  const onSelectChange = (index, item) => {
    setSelectedRowKeys(item)
  }

  const rowSelection = {
    onChange: onSelectChange,
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
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
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
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
      width: '15%',
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
      width: '35%',
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
      title: 'Role',
      dataIndex: 'role',
      width: '5%',
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
      width: '10%',
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
      customAxiosApi.delete(`${url}/${item.id}`)
      .then(response => {
        console.log(response.data)
      })
    })

    dispatch(fetchUsers(url))
  }

  return (
    <>
      <div className="users">
        <div className="box-btn">
          <Link
            to={`/${url}/${CREAT.toLowerCase()}`}
            className="box-btn--link"
          >
            <Create />
          </Link>

          <Link
            to={`/${url}/${CREAT.toLowerCase()}`}
            className="box-btn--link"
          >
            <Create />
          </Link>
        </div>

        <BoxItemDele
          items={selectedRowKeys}
          onClick={handleDeleteSelect}
        />

        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataUsers.list}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => dispatch(setUser(record))
            }
          }}
        />
      </div>
    </>
  )
}

export default Users
