import { useState, useEffect, useMemo } from 'react'
import { Table, Button } from 'antd'
import { BtnCreatExport } from '../../../../Components/Btn'
import BoxItemDele from '../../../../Components/BoxItemDele'
import { EDIT, CREAT, API_NAME } from '../../../../dataDefault'
import { useGetColumnSearchProps } from '../../../../Components/access/logic/searchColumn'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSliderAll } from '../../../../rootReducers/sliderSlice'
import { customAxiosApi } from '../../../../customAxiosApi'
import { date } from '../../../../Components/myMonment'
import { openMessage, messageError } from '../../../../Components/openMessage'
import moment from 'moment'
import PropTypes from 'prop-types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const Slider = ({ match }) => {
  const url = match.url.slice(1)
  const dispatch = useDispatch()

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const dataSlider = useSelector(state => state.slider)

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchSliderAll())
  }, [dispatch])

  useMemo(() => {
    setTimeout(() => {
      if (dataSlider.loading === 'success') {
        dispatch(hideLoading('sectionBar'))
      }
    }, 500)
  }, [dataSlider.loading, dispatch])

  const onSelectChange = (index, item) => {
    setSelectedRowKeys(item)
  }

  const rowSelection = {
    onChange: onSelectChange,
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'update_at',
      width: '8%',
      fixed: 'left',
      sorter: {
        compare: (a, b) => moment(a.updated).format('x') - moment(b.updated).format('x'),
      },
      render: (text, record) => (
        <Link
          to={`/${url}/${record.id}/${EDIT.toLowerCase()}`}
          className="antd-link"
        >
          { date(text) }
        </Link>
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      fixed: 'left',
      width: '12%',
      ...useGetColumnSearchProps('title'),
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
      title: 'Image',
      dataIndex: 'imageUrl',
      width: '25%',
      render: (text, record) => (
        <div
          className="antd-link"
        >
          <img src={text} alt="a" className="slider__image" />
        </div>
      )
    },

    {
      title: 'Sub Title',
      dataIndex: 'subTitle',
      render: (text, record) => (
        <div
          className="antd-link"
        >
          { text }
        </div>
      )
    },
    {
      title: 'Link URL',
      dataIndex: 'url',
      render: (text, record) => (
        <div
          className="antd-link"
        >
          { text }
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'isStatus',
      width: '5%',
      render: (text, record) => (
        <div
          className="antd-link"
        >
          { text }
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: '10%',
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
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </div>
      )
    },
  ]

  const handleDelete = async id => {
    dispatch(showLoading('sectionBar'))
    await customAxiosApi.delete(`${API_NAME.SLIDER}/${id}`)
    .catch(rej => {
      messageError(rej.messageError)
    })

    openMessage('Delete Success!')

    dispatch(fetchSliderAll())
  }

  const handleDeleteSelect = async () => {
    dispatch(showLoading('sectionBar'))

    await selectedRowKeys.forEach(item => {
      customAxiosApi.delete(`${API_NAME.SLIDER}/${item.id}`)
    })

    openMessage('Delete Success!')

    await dispatch(fetchSliderAll())
    dispatch(hideLoading('sectionBar'))
    setSelectedRowKeys([])
  }

  return (
    <div className="slider posi-relative">
      <div className="box-btn">
          <Link
            to={`/${url}/${CREAT.toLowerCase()}`}
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
        dataSource={dataSlider.list}
        scroll={{ x: 1600 }}
      />
    </div>
  )
}

Slider.propTypes = {
  match: PropTypes.object
}

Slider.defaultProps = {
  match: {
    url: ''
  }
}

export default Slider
