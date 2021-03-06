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
  const dataUsers = useSelector((state) => state.users)
  const dataToken = useSelector((state) => state.login.token)
  const dataCarts = useSelector((state) => state.carts.list)
  const dataProductDetailOrder = useSelector(
    (state) => state.productDetailOrder.list,
  )
  const dataProductInCart = useSelector((state) => state.productInCart.list)
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!dataToken && !idLogin) {
      history.replace('/')
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
      render: (text) => <p className="antd-link">{text}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      render: (text) => <p className="antd-link">{text}</p>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '12%',
      ...useGetColumnSearchProps('phone'),
      render: (text) => <p className="antd-link">{text}</p>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      ...useGetColumnSearchProps('address'),
      render: (text) => <p className="antd-link">{text}</p>,
    },
    {
      title: 'Gender',
      dataIndex: 'genderID',
      width: '5%',
      render: (text) => <p className="antd-link">{text}</p>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '5%',
      render: (text) => <p className="antd-link">{text}</p>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '15%',
      render: (text, record) => (
        <div className="antd-link">
          <Link to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}>
            <Button type="primary">Edit</Button>
          </Link>
          &nbsp;
          <Button
            type="primary"
            danger
            onClick={(e) => handleDelete(e, record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const handleDelete = async (e = null, id) => {
    dispatch(showLoading('sectionBar'))

    const cart = dataCarts.find((item) => item.usersID === id)
    const newDataCart = dataProductInCart.filter(
      (item) => item.cartID === cart.id,
    )
    const { orders } = cart

    if (orders.length) {
      for (let order of orders) {
        const findData = dataProductDetailOrder.find(
          (item) => item.detailOrderID === order.detailOrderID,
        )

        await customAxiosApi
          .delete(`${API_NAME.PRODUCTDETAILORDER}/${findData.id}`)
          .then((res) => {
            customAxiosApi.delete(
              `${API_NAME.DETAILORDER}/${findData.detailOrderID}`,
            )
          })
        await customAxiosApi.delete(`${API_NAME.ORDERS}/${order.id}`)
      }
    }

    if (newDataCart.length) {
      for (let key of newDataCart) {
        await customAxiosApi.delete(`${API_NAME.PRODUCTINCART}/${key.id}`)
      }
    }

    await customAxiosApi
      .delete(`${API_NAME.CARTS}/${cart.id}`)
      .then(() => {
        customAxiosApi.delete(`${API_NAME.USERS}/${id}`).then((res) => {
          dispatch(fetchUsers())
          openMessage('Delete Success!')
        })
      })
      .catch((reject) => {
        messageError(reject.message)
      })

    await dispatch(hideLoading('sectionBar'))
  }

  const handleDeleteSelect = async () => {
    dispatch(showLoading('sectionBar'))

    for (let item of selectedRowKeys) {
      await handleDelete(null, item.id)
    }

    openMessage('Delete Success!')
    setSelectedRowKeys([])
    await dispatch(fetchUsers())
    await dispatch(hideLoading('sectionBar'))
  }

  return (
    <>
      <div className="users posi-relative">
        <div className="box-btn">
          <Link to={`/${url}/${CREAT.toLowerCase()}`} className="box-btn--link">
            <BtnCreatExport icon="fas fa-plus" title="Create" />
          </Link>

          <div className="box-btn--link">
            <BtnCreatExport icon="fas fa-arrow-alt-to-bottom" title="Export" />
          </div>
        </div>

        <BoxItemDele items={selectedRowKeys} onClick={handleDeleteSelect} />

        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataUsers.list}
          pagination={dataUsers.list.length > 10}
        />
      </div>
    </>
  )
}

Users.propTypes = {
  url: PropTypes.string,
}

Users.defaultProps = {
  url: '',
}

export default Users
