import { useState, useEffect, useMemo } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { BtnCreatExport } from '../../../../Components/Btn'
import BoxItemDele from '../../../../Components/BoxItemDele'
import { EDIT, CREAT, API_NAME } from '../../../../dataDefault'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../../../rootReducers/userSlice'
import { customAxiosApi }  from '../../../../customAxiosApi'
import PropTypes from 'prop-types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const Users = ({ match }) => {
  const url = match.url.slice(1)
  const dispatch = useDispatch()

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const dataUsers = useSelector(state => state.users)

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchUsers())
  }, [dispatch])

  useMemo(() => {
    setTimeout(() => {
      if (dataUsers.loading === 'success') {
        dispatch(hideLoading('sectionBar'))

      }
    }, 500)
  }, [dataUsers.loading, dispatch])

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
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
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
      width: '15%',
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
      width: '35%',
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
      title: 'Role',
      dataIndex: 'role',
      width: '5%',
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
      width: '10%',
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
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
    dispatch(showLoading('sectionBar'))

    await selectedRowKeys.forEach(item => {
      customAxiosApi.delete(`${API_NAME.USERS}/${item.id}`)
      .then(() => {
        dispatch(fetchUsers())
      })
    })

    setSelectedRowKeys([])
  }

  return (
    <>
      <div className="users posi-relative">
        <div className="box-btn">
          <Link
            to={`/${url}/${CREAT.toLowerCase()}`}
            className="box-btn--link"
          >
            <BtnCreatExport icon="fas fa-plus" title="Create"/>
          </Link>

          <div className="box-btn--link">
            <BtnCreatExport
              icon="fas fa-arrow-alt-to-bottom"
              title="Export"
            />
          </div>
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
        />
      </div>
    </>
  )
}

Users.propTypes = {
  url: PropTypes.string
}

Users.defaultProps = {
  url: ''
}

export default Users
