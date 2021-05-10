import { useState, useEffect, useMemo } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { BtnCreatExport } from '../../../../Components/Btn'
import BoxItemDele from '../../../../Components/BoxItemDele'
import { EDIT, CREAT, API_NAME } from '../../../../dataDefault'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../../../rootReducers/userSlice'
import { customAxiosApi }  from '../../../../customAxiosApi'
// import PropTypes from 'prop-types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const Slide = () => {
  // const dispatch = useDispatch()

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const dataUsers = useSelector(state => state.users)

  // useEffect(() => {
  //   dispatch(showLoading('sectionBar'))
  //   dispatch(fetchUsers())
  // }, [dispatch])

  // useMemo(() => {
  //   setTimeout(() => {
  //     if (dataUsers.loading === 'success') {
  //       dispatch(hideLoading('sectionBar'))

  //     }
  //   }, 500)
  // }, [dataUsers.loading, dispatch])

  const onSelectChange = (index, item) => {
    setSelectedRowKeys(item)
  }

  const rowSelection = {
    onChange: onSelectChange,
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '10%',
      // ...useGetColumnSearchProps('name'),
      // render: (text, record) => (
      //   <Link
      //     // to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
      //     className="antd-link"
      //   >
      //     { text }
      //   </Link>
      // )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '15%',
      // ...useGetColumnSearchProps('name'),
      // render: (text, record) => (
      //   <Link
      //     // to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
      //     className="antd-link"
      //   >
      //     { text }
      //   </Link>
      // )
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '30%',
      render: (text, record) => (
        <Link
          // to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          to=""
          className="antd-link"
        >
          {/* { text } */}
          <img src={text} alt="a" className="slide__image" />
        </Link>
      )
    },

    {
      title: 'Sub Title',
      dataIndex: 'subTitle',
      // width: '15%',
      // ...useGetColumnSearchProps('phone'),
      // render: (text, record) => (
      //   <Link
      //     // to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
      //     className="antd-link"
      //   >
      //     { text }
      //   </Link>
      // )
    },
    {
      title: 'Edit',
      dataIndex: 'action',
      width: '10%',
      render: (text, record) => (
        <Link
          // to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          <Space size="middle">
            <EditOutlined className="icon-edit"/>
          </Space>
        </Link>
      )
    },
  ]
  const data = [
    {
      id: 1,
      title: 'sile1',
      image:'https://www.infographic24h.com/wp-content/uploads/2014/03/Kute-Cat.jpg',
      subTitle: '',
      date: '9/05/2021'
    },
    {
      id: 2,
      title: 'sile1',
      image:'https://www.infographic24h.com/wp-content/uploads/2014/03/Kute-Cat.jpg',
      subTitle: '',
      date: '9/05/2021'
    },
    {
      id: 3,
      title: 'sile1',
      image:'https://www.infographic24h.com/wp-content/uploads/2014/03/Kute-Cat.jpg',
      subTitle: '',
      date: '9/05/2021'
    },
    {
      id: 4,
      title: 'sile1',
      image:'https://www.infographic24h.com/wp-content/uploads/2014/03/Kute-Cat.jpg',
      subTitle: '',
      date: '9/05/2021'
    },
  ]

  const handleDeleteSelect = async () => {
    // dispatch(showLoading('sectionBar'))

    // await selectedRowKeys.forEach(item => {
    //   customAxiosApi.delete(`${API_NAME.USERS}/${item.id}`)
    //   .then(() => {
    //     dispatch(fetchUsers())
    //   })
    // })

    // setSelectedRowKeys([])
  }

  return (
    <div className="slide posi-relative">
      <div className="box-btn">
          <Link
            // to={`/${url}/${CREAT.toLowerCase()}`}
            to='slider/creat'
            className="box-btn--link"
          >
            <BtnCreatExport icon="fas fa-plus" title="Create"/>
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
        dataSource={data}
      />
    </div>
  )
}

export default Slide