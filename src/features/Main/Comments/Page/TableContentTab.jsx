import { useState } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import BoxItemDele from '../../../../Components/BoxItemDele'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fetchComments, setDataComment } from '../../../../rootReducers/commentSlice'
import { useDispatch } from 'react-redux'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { customAxiosApi } from '../../../../customAxiosApi'
import EditComments from './Edit/EditComments'

const TableContentTab = ({ data, url }) => {
  const dispatch = useDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isEditComments, setIsEditComments] = useState(false)

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
      width: 100,
      render: text => (
        <div className="antd-link">
          { moment(text).format("DD-MM-YYYY") }
        </div>
      )
    },
    {
      title: 'userName',
      dataIndex: 'userName',
      width: 170,
      ...useGetColumnSearchProps('userName'),
      render: text => (
        <div className="antd-link">
          { text }
        </div>
      )
    },
    {
      title: 'Products',
      dataIndex: 'nameProduct',
      width: '25%',
      ...useGetColumnSearchProps('nameProduct'),
      render: text => (
        <div className="antd-link one-line" title={text}>
          { text }
        </div>
      )
    },
    {
      title: 'Comment',
      dataIndex: 'title',
      width: '25%',
      render: text => (
        <div className="antd-link one-line" title={text}>
          { text }
        </div>
      )
    },
    {
      title: 'status',
      dataIndex: 'statusComments',
      width: 100,
      render: text => (
        <div className="antd-link">
          { text }
        </div>
      )
    },
    {
      title: 'Edit',
      dataIndex: 'action',
      width: 70,
      render: () => (
        <div className="antd-link">
          <Space size="middle">
            <EditOutlined className="icon-edit"/>
          </Space>
        </div>
      )
    },
  ]

  const handleDeleteSelect = async () => {
    await selectedRowKeys.forEach(item => {
      customAxiosApi.delete(`${url}/${item.id}`)
    })

    setSelectedRowKeys([])
    await dispatch(fetchComments(url))
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
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                dispatch(setDataComment(record))
                setIsEditComments(true)
              }
            }
          }}
        />

        <EditComments
          url={url}
          setIsEditComments={setIsEditComments}
          isEditComments={isEditComments}
        />
        <div
          className={`
            overflow
            ${isEditComments ? 'translateZero' : ''}
          `}
          onClick={() => setIsEditComments(false)}
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
