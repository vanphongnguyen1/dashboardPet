import { useState, useEffect } from 'react'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Selector } from '../../../../../Components/Form/Selector'
import { Delete, Save } from '../../../../../Components/Btn'
import DelayLink from '../../../../../Components/DelayLink'
import { Tabs } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLineage } from '../../../../../rootReducers/lineageSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Upload from '../../../../../Components/Form/Upload'
import InputRadio from '../../../../../Components/Form/InputRadio'

function Form() {
  const { TabPane } = Tabs
  const dispatch = useDispatch()

  const dataGroup = useSelector(state => state.groups.list)
  const dataLineage = useSelector(state => state.lineage.list)
  const isHideLoading = useSelector(state => state.lineage.loading)

  const initialState = {
    name: '',
    price: '',
    priceSale: '',
    group: 1,
    lineage: 1,
    isStatus: 1,
    new: 0,
    hot: 0,
    files: []
  }

  const [dataProduct, setDataProduct] = useState(initialState)

  useEffect(() => {
    dispatch(fetchLineage(dataProduct.group))
  }, [dataProduct.group, dispatch])

  useEffect(() => {
    if (isHideLoading === 'success') {
      dispatch(hideLoading('sectionBar'))
    }
  }, [isHideLoading, dispatch])

  const handleOnchange = e => {
    const { value, files, type, name  } = e.target
    let newValue = value

    if ( type === 'file') {
      const listFile = []

      for (let i = 0; i < files.length; i++) {
        const { name } = files[i]

        if (name) {
          listFile.push(name)
        }
      }

      newValue = listFile
    }

    setDataProduct({
      ...dataProduct,
      [name]: newValue
    })
  }

  const handleOnchangeGroup = async e => {
    const { value, name } = e.target
    dispatch(showLoading('sectionBar'))

    setDataProduct({
      ...dataProduct,
      [name]: value,
      lineage: ''
    })
  }

  const handleChangeEditor = (e, editor) => {

  }

  return (
    <>
      <form className="form">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="INFOMATION" key="1">
            <div className="box-tabs">
              <div className="form__product">
                <GroupInput
                  type="text"
                  name="name"
                  value={ dataProduct.name }
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
                      value={ dataProduct.price }
                      titleLabel="Price"
                      onChange={ handleOnchange }
                    />
                  </div>

                  <div className="box-6">
                    <GroupInput
                      type="number"
                      value={ dataProduct.priceSale }
                      name="priceSale"
                      titleLabel="Price Sale"
                      onChange={ handleOnchange }
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="box-row">
                  <div className="box-6">
                    <Selector
                      name="group"
                      value={ dataProduct.group }
                      title="Group"
                      onChange={ handleOnchangeGroup }
                      options={ dataGroup }
                    />
                  </div>

                  <div className="box-6">
                    <Selector
                      name="lineage"
                      value={ dataProduct.lineage }
                      title="Lineage"
                      onChange={ handleOnchange }
                      disabled={ dataProduct.group ? false : true }
                      options={ dataLineage }
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="form__product-box">
                  <InputRadio
                    name="isStatus"
                    id="onProduct"
                    lable="on"
                    value="1"
                    onChange={ handleOnchange }
                    checked={ dataProduct.isStatus === '1' }
                  />

                  <InputRadio
                    name="isStatus"
                    id="offProduct"
                    lable="off"
                    value="0"
                    onChange={ handleOnchange }
                    checked={ dataProduct.isStatus === '0' }
                  />

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
                  dataProduct={ dataProduct.files }
                  id="files"
                  onChange={ handleOnchange }
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
                  data="<p>Hello from CKEditor 5!</p>"
                  onReady={  editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log( 'Editor is ready to use!', editor );
                  }}
                  onChange={ (event, editor) => handleChangeEditor(event, editor) }
                  onBlur={ (event, editor) => {
                      console.log( 'Blur.', editor );
                  }}
                  onFocus={ (event, editor) => {
                      console.log( 'Focus.', editor );
                  }}
                />
              </div>
            </div>
          </TabPane>
        </Tabs>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save">
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
