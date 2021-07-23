import { useState, useEffect } from 'react'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Save } from '../../../../../Components/Btn'
import { Tabs } from 'antd'
import { Textarea } from '../../../../../Components/Form/Textarea'
import { useDispatch } from 'react-redux'
import { fetchSlider } from '../../../../../rootReducers/sliderSlice'
import Upload from '../../../../../Components/Form/Upload'
import { getBase64 } from '../../../../../Components/access/logic/getBase64'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { API_NAME } from '../../../../../dataDefault'
import { messageError, openMessage } from '../../../../../Components/openMessage'
import { Switch } from 'antd'
import PropTypes from 'prop-types'
import { CREAT, EDIT } from '../../../../../dataDefault'
import { useParams } from 'react-router-dom'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const Form = ({ url }) => {
  const { id } = useParams()
  const urlConvert = url.split('/')
  const pathUrl = urlConvert[urlConvert.length - 1]

  const isRequitEdit = pathUrl === EDIT
  const isRequitCreat = pathUrl === CREAT

  const { TabPane } = Tabs
  const dispatch = useDispatch()

  const initialState = {
    title: '',
    subTitle: '',
    url: '',
    isStatus: true,
  }

  const initialValide = {
    title: '',
    subTitle: '',
  }

  const [dataSlider, setDataSlider] = useState(initialState)
  const [dataValide, setDataValide] = useState(initialValide)

  const [dataFiles, setDataFiles] = useState([])
  const [dataImageBase64, setDataImageBase64] = useState([])

  useEffect(() => {
    if (id) {
      dispatch(showLoading('sectionBar'))
      dispatch(fetchSlider(id))
      .then(res => {

        const { data } = res.payload
        setDataSlider(data)
        setDataImageBase64([data.imageUrl])
        setDataFiles([data.imageUrl])

        setTimeout(() => {
          dispatch(hideLoading('sectionBar'))
        }, 500)
      })
      .catch(() => {

      })
    }
  }, [dispatch, id])

  const handleOnBlur = e => {
    const { value, name } = e.target

    if ( !value ) {
      setDataValide({
        ...dataValide,
        [name]: 'Requite *'
      })
    }
  }

  const handleOnchange = async e => {
    const { value, files, type, name  } = e.target

    if ( type === 'file') {
      const newFiles = []
      const base64 = []

      for (let i = 0; i < files.length; i++) {
        if (files[i].name.indexOf('.jpg') !== -1 || files[i].name.indexOf('.png') !== -1) {
          base64.push(
            await getBase64(files[i])
          )

          newFiles.push(files[i])
        }
      }

      setDataImageBase64(base64)
      setDataFiles(newFiles)

      return
    }

    setDataSlider({
      ...dataSlider,
      [name]: value
    })

    setDataValide({
      ...dataValide,
      [name]:  ''
    })
  }

  const handleDeleteImage = index => {
    const [...newDataFile] = dataFiles
    const [...newDataBase64] = dataImageBase64

    newDataBase64.splice(index, 1)
    newDataFile.splice(index, 1)

    setDataImageBase64([...newDataBase64])

    setDataFiles(newDataFile)
  }

  const valideChecked = () => {
    const { ...valide } = dataValide
    const isChecked = true

    for( let key in dataSlider) {
      if (!dataSlider[key] && key !== 'isStatus') {
        valide[key] = 'Requite *'
      }
    }

    setDataValide(valide)

    for( let key in valide) {
      if (valide[key]) {
        return !isChecked
      }
    }

    if (!dataFiles.length) {
      return !isChecked
    }

    return isChecked
  }

  const onSubmit = async () => {
    const isValide = valideChecked()

    if (isValide) {
      dispatch(showLoading('sectionbar'))
      console.log('ádasd', pathUrl);
      console.log('ádasd', CREAT);

      if (isRequitCreat) {
          const data = new FormData()
          data.append('files', dataFiles[0])
          data.append('title', dataSlider.title)
          data.append('subTitle', dataSlider.subTitle)
          data.append('url', dataSlider.url)
          data.append('isStatus', dataSlider.isStatus ? 1 : 0)

            customAxiosApi.post(API_NAME.SLIDER, data)
            .then((respo) => {
              openMessage('Push Success !')
              console.log('adasdasd',respo );

              setDataSlider({
                title: '',
                subTitle: '',
                url: '',
                isStatus: true,
              })

              setDataFiles([])
              setDataImageBase64([])
            })

            .catch(err => {
              messageError(err.message)
            })
          }

      if (isRequitEdit) {
        const data = new FormData()
        data.append('files', dataFiles[0])
        data.append('title', dataSlider.title)
        data.append('subTitle', dataSlider.subTitle)
        data.append('url', dataSlider.url)
        data.append('isStatus', dataSlider.isStatus ? 1 : 0)
        data.append('_method', 'put')

        customAxiosApi.post(`${API_NAME.SLIDER}/${id}`, data)
        .then(() => {
          openMessage('Push Success !')
        })
        .catch(err => {
          messageError(err.message)
        })
      }

      await dispatch(hideLoading('sectionbar'))
    } else {
      messageError('Hãy điền đầy đủ form các Tabs !')
    }
  }

  const onChangeSwitch = (checked, e) => {
    const { name } = e.currentTarget

    setDataSlider({
      ...dataSlider,
      [name]: checked
    })
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit} autoComplete="off">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="INFOMATION" key="1">
            <div className="box-tabs">
              <div className="form__product">
                <GroupInput
                  type="text"
                  name="title"
                  value={ dataSlider.title }
                  validateName={ dataValide.title }
                  titleLabel="Title Slider"
                  onChange={ handleOnchange }
                  onBlur={ handleOnBlur }
                />
              </div>

              <div className="form__product">
                <GroupInput
                  type="text"
                  name="url"
                  value={ dataSlider.url }
                  validateName={ dataValide.url }
                  titleLabel="Url Slider"
                  onChange={ handleOnchange }
                  onBlur={ handleOnBlur }
                />
              </div>

              <div className="form__product">
                <Textarea
                  name="subTitle"
                  value={ dataSlider.subTitle }
                  validateName={ dataValide.subTitle }
                  title="Sub Title Slider"
                  onChange={ handleOnchange }
                  onBlur={ handleOnBlur }
                />
              </div>

              <div className="form__product">
                <div className="box-switch">
                  <div className="form__product-box">
                    <p className="title-status">Show</p>

                    <Switch
                      defaultChecked={dataSlider.isStatus}
                      onChange={onChangeSwitch}
                      name="isStatus"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="IMAGES" key="2">
            <div className="box-tabs">
              <div className="form__product">
                <Upload
                  data={ dataImageBase64 }
                  onChange={ handleOnchange }
                  handleDeleteItem={handleDeleteImage}
                  nameUrl={urlConvert[1]}
                />
              </div>
            </div>
          </TabPane>
        </Tabs>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save" onClick={onSubmit}>
              <Save />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

Form.propTypes = {
  url: PropTypes.string
}
Form.defaultProps = {
  url: ''
}

export default Form
