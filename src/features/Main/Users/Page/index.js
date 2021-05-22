import { useState, useEffect, useMemo } from 'react'
import { Table, Button } from 'antd'
import { BtnCreatExport } from '../../../../Components/Btn'
import BoxItemDele from '../../../../Components/BoxItemDele'
import { EDIT, CREAT, API_NAME } from '../../../../dataDefault'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../../../rootReducers/userSlice'
import { customAxiosApi } from '../../../../customAxiosApi'
import { openMessage, messageError } from '../../../../Components/openMessage'
import PropTypes from 'prop-types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const Users = ({ match }) => {
  const url = match.url.slice(1)
  const dispatch = useDispatch()
  const history = useHistory()

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const dataUsers = useSelector(state => state.users)
  const dataToken = useSelector(state => state.login.token)
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!dataToken && !idLogin) {
      history.replace("/")
    }
  }, [dataToken, history, idLogin])

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
      width: '12%',
      ...useGetColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '12%',
      ...useGetColumnSearchProps('phone'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      ...useGetColumnSearchProps('address'),
    },
    {
      title: 'Gender',
      dataIndex: 'genderID',
      width: '5%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '5%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '15%',
      render: (text, record) => (
        <div
          className="antd-link"
        >
          <Link to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}>
            <Button type="primary">Edit</Button>
          </Link>&nbsp;

          <Button
            type="primary"
            danger
            onClick={e => handleDelete(e, record.id)}
          >
            Delete
          </Button>
        </div>
      )
    },
  ]

  const handleDelete = async (e, id) => {
    e.stopPropagation()

    dispatch(showLoading('sectionBar'))
    await customAxiosApi.delete(`${API_NAME.USERS}/${id}`)
    .catch(rej => {
      messageError(rej.messageError)
    })

    openMessage('Delete Success!')

    await dispatch(fetchUsers())
    dispatch(hideLoading('sectionBar'))
  }

  const handleDeleteSelect = async () => {
    dispatch(showLoading('sectionBar'))

    await selectedRowKeys.forEach(item => {
      customAxiosApi.delete(`${API_NAME.USERS}/${item.id}`)
    })

    openMessage('Delete Success!')

    await dispatch(fetchUsers())
    dispatch(hideLoading('sectionBar'))
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
          onRow={(record) => ({
            onClick: () => {
              history.replace(`/${url}/${record.id}/${EDIT.toLowerCase()}`)
            },
          })}
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
