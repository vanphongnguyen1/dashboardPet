import { useState } from 'react'
import { Table, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import BoxItemDele from '../../../../Components/BoxItemDele'
import PropTypes from 'prop-types'
import { date } from '../../../../Components/myMonment'

import {
  fetchComments,
  setDataComment,
  defaultDataComment
} from '../../../../rootReducers/commentSlice'

import {
  useGetColumnSearchProps
} from '../../../../Components/access/logic/searchColumn'

import { useDispatch, useSelector } from 'react-redux'
import { customAxiosApi } from '../../../../customAxiosApi'
import EditComments from './Edit/EditComments'
import { API_NAME } from '../../../../dataDefault'
import moment from 'moment'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { openMessage } from '../../../../Components/openMessage'

const TableContentTab = ({ data }) => {
  const dispatch = useDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const isEdit = useSelector(state => state.comments.dataEdit.isEdit)

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
      sorter: {
        compare: (a, b) => moment(a.updated).format('x') - moment(b.updated).format('x'),
      },
      render: text => (
        <div className="antd-link">
          { date(text) }
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
    dispatch(showLoading('sectionBar'))

    await selectedRowKeys.forEach(item => {
      customAxiosApi.delete(`${API_NAME.COMMENTS}/${item.id}`)
    })

    openMessage('Delete Success')
    setSelectedRowKeys([])
    await setTimeout(() => {
      dispatch(fetchComments())
      dispatch(hideLoading('sectionBar'))
    }, 500)
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
          onRow={record => {
            return {
              onClick: () => {
                dispatch(setDataComment(record))
                console.log('ewqe', record)
              }
            }
          }}
        />

        <EditComments />
        <div
          className={`
            overflow
            ${isEdit ? 'translateZero' : ''}
          `}
          onClick={() => dispatch(defaultDataComment())}
        />
      </div>
    </>
  )
}

TableContentTab.propTypes = {
  data: PropTypes.array,
}

TableContentTab.defaultProps = {
  data: [],
}

export default TableContentTab
