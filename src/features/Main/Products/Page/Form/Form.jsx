import { useState, useEffect, useRef } from 'react'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Selector } from '../../../../../Components/Form/Selector'
import { Delete, Save } from '../../../../../Components/Btn'
import DelayLink from '../../../../../Components/DelayLink'
import { Tabs } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLineage } from '../../../../../rootReducers/lineageSlice'
import { fetchGender } from '../../../../../rootReducers/genderSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Upload from '../../../../../Components/Form/Upload'
import InputRadio from '../../../../../Components/Form/InputRadio'
import { getBase64 } from '../../../../../Components/access/logic/getBase64'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { API_NAME } from '../../../../../dataDefault'
import { messageError, openMessage } from '../../../../../Components/openMessage'

function Form() {
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
    lineage: '',
    genderID: '1',
    isStatus: '1',
    new: '0',
    hot: '0',
    files: [],
    description: ''
  }

  const initialValide = {
    name: '',
    price: '',
    priceSale: '',
    groupID: '',
    lineage: '',
    genderID: '',
  }

  const [dataProduct, setDataProduct] = useState(initialState)
  const [dataValide, setDataValide] = useState(initialValide)
  const [dataImageBase64, setDataImageBase64] = useState([])
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    dispatch(fetchGender())
  }, [dispatch])

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

  const handleOnchange = async e => {
    const { value, files, type, name  } = e.target
    let newValue = value

    if ( type === 'file') {
      const listFile = []
      const base64 = []

      for (let i = 0; i < files.length; i++) {
        const { name } = files[i]

        if (name) {
          base64.push({
            id: i,
            name: await getBase64(files[i])
          })

          listFile.push({
            id: i,
            name
          })
        }
      }

      setDataImageBase64(
        [...dataImageBase64, ...base64]
      )
      newValue = listFile
    }

    if (name === 'groupID') {
      setDataProduct({
        ...dataProduct,
        [name]: value,
        lineage: ''
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

  const handleDeleteImage = id => {
    const newDataBase64 = dataImageBase64.filter(item => item.id !== id)
    const newDataFiles = dataProduct.files.filter(item => item.id !== id)

    setDataImageBase64(newDataBase64)
    setDataProduct({
      ...dataProduct,
      files: newDataFiles
    })
  }

  const handleViewImage = () => {}

  const handleChangeEditor = (e, editor) => {
    const value = editor.getData()

    if (typingTimeoutRef.current) {
      clearInterval(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setDataProduct({
        ...dataProduct,
        description: value,
      })
    }, 300)
  }

  const valideChecked = () => {
    const { ...valide } = dataValide

    for( let key in dataProduct) {
      if (!dataProduct[key] && key !== 'description') {
        valide[key] = 'Requite *'
      }
    }

    setDataValide(valide)

    for( let key in valide) {
      if (valide[key]) {
        return false
      }
    }

    return true
  }

  const handleValideTabs = () => {
    const isValide = valideChecked()

    if (!isValide || !dataProduct.files.length || !dataProduct.description.length) {
      if (!isValide) {
        const ele = document.querySelector('#rc-tabs-0-tab-1')
        ele.classList.add('valide-label')
      } else {
        const ele = document.querySelector('#rc-tabs-0-tab-1')
        ele.classList.remove('valide-label')
      }

      if (!dataProduct.files.length) {
        const ele = document.querySelector('#rc-tabs-0-tab-2')
        ele.classList.add('valide-label')
      } else {
        const ele = document.querySelector('#rc-tabs-0-tab-2')
        ele.classList.remove('valide-label')
      }

      if (!dataProduct.description.length) {
        const ele = document.querySelector('#rc-tabs-0-tab-3')
        ele.classList.add('valide-label')
      } else {
        const ele = document.querySelector('#rc-tabs-0-tab-3')
        ele.classList.remove('valide-label')
      }

      return false
    } else {
      return true
    }
  }

  const onSubmit = () => {
    const isValide = handleValideTabs()
    console.log("🚀 ~ file: Form.jsx ~ line 208 ~ onSubmit ~ isValide", isValide)

    console.log(dataProduct)
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
                />
              </div>

              <div className="form__product">
                <div className="box-row">
                  <div className="box-6">
                    <GroupInput
                      type="number"
                      name="price"
                      titleLabel="Price"
                      value={ dataProduct.price }
                      validateName={ dataValide.price }
                      onChange={ handleOnchange }
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
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="box-row">
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
                      name="lineage"
                      title="Lineage"
                      value={ dataProduct.lineage }
                      validateName={ dataValide.lineage }
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
                <div className="form__product-box">
                  <InputRadio
                    name="isStatus"
                    id="showProduct"
                    lable="Show Product"
                    value="1"
                    onChange={ handleOnchange }
                    checked={ dataProduct.isStatus === '1' }
                  />

                  <InputRadio
                    name="isStatus"
                    id="hiddenProduct"
                    lable="Hidden Product"
                    value="0"
                    onChange={ handleOnchange }
                    checked={ dataProduct.isStatus === '0' }
                  />
                </div>

                <div className="form__product-box">
                  <InputRadio
                    name="new"
                    id="onNew"
                    value="1"
                    lable="New"
                    onChange={ handleOnchange }
                    checked={ dataProduct.new === '1' }
                  />

                  <InputRadio
                    name="new"
                    id="offNew"
                    value="0"
                    lable="Off New"
                    onChange={ handleOnchange }
                    checked={ dataProduct.new === '0' }
                  />
                </div>

                <div className="form__product-box">
                  <InputRadio
                    name="hot"
                    id="onHot"
                    value="1"
                    lable="Hot"
                    onChange={ handleOnchange }
                    checked={ dataProduct.hot === '1' }
                  />

                  <InputRadio
                    name="hot"
                    id="offHot"
                    value="0"
                    lable="Off Hot"
                    onChange={ handleOnchange }
                    checked={ dataProduct.hot === '0' }
                  />
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="IMAGES" key="2">
            <div className="box-tabs">
              <div className="form__product">
                <Upload
                  dataProduct={ dataImageBase64 }
                  id="files"
                  onChange={ handleOnchange }
                  handleDeleteItem={handleDeleteImage}
                  handleViewImage={handleViewImage}
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
                  // data="<p>Hello from CKEditor 5!</p>"
                  onReady={  editor => {
                      // You can store the "editor" and use when it is needed.
                      // console.log( 'Editor is ready to use!', editor );
                  }}
                  onChange={ (event, editor) => handleChangeEditor(event, editor) }
                  onBlur={ (event, editor) => {
                      // console.log( 'Blur.', editor );
                  }}
                  onFocus={ (event, editor) => {
                      // console.log( 'Focus.', editor );
                  }}
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
              {/* {
                isRequitEdit
                  ? ( */}
                      <DelayLink
                        to=""
                        className="box-submit__delete"
                        delay={ 1000}
                        children={ <Delete/>}
                      />
                  {/* ) : ''
              } */}
          </div>
        </div>
      </form>
    </>
  )
}

export default Form
