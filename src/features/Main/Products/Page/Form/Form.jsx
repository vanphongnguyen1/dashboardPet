import { useState, useEffect, useRef } from 'react'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Selector } from '../../../../../Components/Form/Selector'
import { Save } from '../../../../../Components/Btn'
import { Tabs } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLineage } from '../../../../../rootReducers/lineageSlice'
import { fetchGender } from '../../../../../rootReducers/genderSlice'
import { fetchGroup } from '../../../../../rootReducers/groupSlice'
import { fetchProduct } from '../../../../../rootReducers/productsSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Upload from '../../../../../Components/Form/Upload'
import { getBase64 } from '../../../../../Components/access/logic/getBase64'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { API_NAME } from '../../../../../dataDefault'
import { messageError, openMessage } from '../../../../../Components/openMessage'
import { Switch } from 'antd'
import PropTypes from 'prop-types'
import { CREAT, EDIT } from '../../../../../dataDefault'
import { useParams } from 'react-router-dom'

const Form = ({ url }) => {
  const { id } = useParams()
  const urlConvert = url.split('/')
  const pathUrl = urlConvert[urlConvert.length - 1]

  const isRequitEdit = pathUrl === EDIT
  const isRequitCreat = pathUrl === CREAT

  const { TabPane } = Tabs
  const dispatch = useDispatch()

  const dataGender = useSelector(state => state.gender.list)
  const dataGroup = useSelector(state => state.groups.list)
  const dataLineage = useSelector(state => state.lineage)

  const initialState = {
    name: '',
    price: '',
    priceSale: '',
    groupID: '1',
    lineageID: '',
    genderID: '1',
    isStatus: true,
    isNew: true,
    isHot: true,
  }

  const initialValide = {
    name: '',
    price: '',
    priceSale: '',
    groupID: '',
    lineageID: '',
    genderID: '',
  }

  const [dataProduct, setDataProduct] = useState(initialState)
  const [dataValide, setDataValide] = useState(initialValide)

  const [dataFiles, setDataFiles] = useState([])
  const [dataEditer, setDataEditer] = useState('')
  const [dataImageBase64, setDataImageBase64] = useState([])

  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    dispatch(fetchGroup())
    dispatch(fetchGender())

    if (id && isRequitEdit) {
      dispatch(showLoading('sectionBar'))

      dispatch(fetchProduct(id))
      .then(data => {
        const { payload } = data

          setDataProduct({
            ...payload,
            groupID: payload.lineage.groupID
          })
          setDataEditer(payload.type_product.description)

          setDataFiles(payload.images.url.split('|'))
          setDataImageBase64(payload.images.url.split('|'))
      })

      setTimeout(() => {
        dispatch(hideLoading('sectionBar'))
      }, 700)
    }

  }, [dispatch, id, isRequitEdit])

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchLineage(dataProduct.groupID))
  }, [dataProduct.groupID, dispatch])

  useEffect(() => {
    if (dataLineage.loading === 'success') {
      setTimeout(() => {
        dispatch(hideLoading('sectionBar'))
      }, 500)
    }
  }, [dataLineage.loading, dispatch])

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
    let newValue = value
    const newFiles = []

    if ( type === 'file') {
      const base64 = []

      for (let i = 0; i < files.length; i++) {
        if (files[i].name.indexOf('.jpg') !== -1 || files[i].name.indexOf('.png') !== -1) {
          base64.push(
            await getBase64(files[i])
          )

          newFiles.push(files[i])
        }
      }

      setDataImageBase64(
        [...dataImageBase64, ...base64]
      )
      setDataFiles(
        [...dataFiles, ...newFiles]
      )
    }

    if (name === 'groupID') {
      setDataProduct({
        ...dataProduct,
        [name]: value,
        lineageID: ''
      })

      return ;
    }

    setDataProduct({
      ...dataProduct,
      [name]: newValue
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

  const handleChangeEditor = (e, editor) => {
    const value = editor.getData()

    if (typingTimeoutRef.current) {
      clearInterval(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setDataEditer(value)
    }, 300)
  }

  const valideChecked = () => {
    const { ...valide } = dataValide
    const isChecked = true

    for( let key in dataProduct) {
      if (!dataProduct[key] && key !== 'isNew' && key !== 'isStatus' && key !== 'isHot') {
        valide[key] = 'Requite *'
      }
    }

    setDataValide(valide)

    for( let key in valide) {
      if (valide[key]) {
        return !isChecked
      }
    }

    if (!dataFiles.length || !dataEditer) {
      return !isChecked
    }

    return isChecked
  }

  const onSubmit = async () => {
    const isValide = valideChecked()

    if (isValide) {
      dispatch(showLoading('sectionbar'))

      const {
        name,
        price,
        priceSale,
        lineageID,
        genderID,
        isStatus,
        isHot,
        isNew,
      } = dataProduct

      const postProduct = {
        name,
        price,
        priceSale,
        lineageID,
        genderID,
        isStatus,
        isNew,
        isHot,
      }

      if (isRequitCreat) {
        const data = new FormData()
        dataFiles.forEach(file => {
          data.append('files[]', file)
        })

        await customAxiosApi.post(API_NAME.IMAGES, data)
        .then(response => {
          const { id } = response.data.data

          return id
        })
        .then(id => {
          const imagesID = id
          customAxiosApi.post(API_NAME.TYPEPRODUCT, {
            description: dataEditer,
          })
          .then(response => {
            const { id } = response.data.data

            customAxiosApi.post(API_NAME.PRODUCTS, {
              ...postProduct,
              typeProductID: id,
              imagesID,
            })
            .then((respo) => {
              openMessage('Push Success !')
              console.log('adasdasd',respo );

              setDataProduct({
                name: '',
                price: '',
                priceSale: '',
                groupID: '1',
                lineageID: '',
                genderID: '1',
                isStatus: true,
                isNew: true,
                isHot: true
              })

              setDataFiles([])

              setDataEditer('')

              setDataImageBase64([])
            })

            .catch(err => {
              messageError(err.message)
            })
          })

          .catch(err => {
            messageError(err.message)
          })
        })

        .catch(err => {
          messageError(err.message)
        })
      }

      if (isRequitEdit) {

        const data = new FormData()

        dataFiles.forEach(file => {
          if (typeof file === 'string') {
            data.append('filesString[]', file)
            return ;
          }

          data.append('files[]', file)
        })

        data.append('_method', 'put')

        customAxiosApi.post(
          `${API_NAME.IMAGES}/${dataProduct.imagesID}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(() => {

          customAxiosApi.put(`${API_NAME.TYPEPRODUCT}/${dataProduct.typeProductID}`, {
            description: dataEditer,
          })
          .then(() => {

            customAxiosApi.put(`${API_NAME.PRODUCTS}/${dataProduct.id}`, postProduct)
            .then(() => {
              openMessage('Push Success !')
            })
            .catch(err => {
              messageError(err.message)
            })

          })
          .catch(err => {
            messageError(err.message)
          })

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

    setDataProduct({
      ...dataProduct,
      [name]: checked
    })
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="INFOMATION" key="1">
            <div className="box-tabs">
              <div className="form__product">
                <GroupInput
                  type="text"
                  name="name"
                  value={ dataProduct.name }
                  validateName={ dataValide.name }
                  titleLabel="Name Product"
                  onChange={ handleOnchange }
                  onBlur={ handleOnBlur }
                />
              </div>

              <div className="form__product">
                <div className="box-row justify-between">
                  <div className="box-6">
                    <GroupInput
                      type="number"
                      name="price"
                      titleLabel="Price"
                      value={ dataProduct.price }
                      validateName={ dataValide.price }
                      onChange={ handleOnchange }
                      onBlur={ handleOnBlur }
                    />
                  </div>

                  <div className="box-6">
                    <GroupInput
                      type="number"
                      name="priceSale"
                      titleLabel="Price Sale"
                      value={ dataProduct.priceSale }
                      validateName={ dataValide.priceSale }
                      onChange={ handleOnchange }
                      onBlur={ handleOnBlur }
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="box-row justify-between">
                  <div className="box-6">
                    <Selector
                      name="groupID"
                      value={ dataProduct.groupID }
                      validateName={ dataValide.groupID }
                      title="Group"
                      onChange={ handleOnchange }
                      options={ dataGroup }
                    />
                  </div>



                  <div className="box-6">
                    <Selector
                      name="lineageID"
                      title="Lineage"
                      value={ dataProduct.lineageID }
                      validateName={ dataValide.lineageID }
                      onChange={ handleOnchange }
                      disabled={ dataLineage.list.length ? false : true }
                      options={ dataLineage.list }
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="box-row">
                  <div className="box-6">
                    <Selector
                      name="genderID"
                      title="Gender"
                      value={ dataProduct.genderID }
                      validateName={ dataValide.genderID }
                      onChange={ handleOnchange }
                      options={ dataGender }
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="box-switch">
                  <div className="form__product-box">
                    <p className="title-status">Show</p>

                    <Switch
                      defaultChecked={dataProduct.isStatus}
                      onChange={onChangeSwitch}
                      name="isStatus"
                    />
                  </div>

                  <div className="form__product-box">
                    <p className="title-status">New</p>

                    <Switch
                      defaultChecked={dataProduct.isNew}
                      onChange={onChangeSwitch}
                      name="isNew"
                    />
                  </div>

                  <div className="form__product-box">
                    <p className="title-status">Hot</p>

                    <Switch
                      defaultChecked={dataProduct.isHot}
                      onChange={onChangeSwitch}
                      name="isHot"
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
                  id="files"
                  onChange={ handleOnchange }
                  handleDeleteItem={handleDeleteImage}
                  multiple
                />
              </div>
            </div>
          </TabPane>

          <TabPane tab="DESCRIPTION" key="3">
            <div className="box-tabs">
              <div className="form__product">
                <CKEditor
                  editor={ ClassicEditor }
                  data={ dataEditer }
                  onChange={ (event, editor) => handleChangeEditor(event, editor) }
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
