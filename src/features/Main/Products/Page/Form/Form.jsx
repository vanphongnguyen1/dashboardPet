import { useState } from 'react'
// import { customAxiosApi } from '../../../../../customAxiosApi'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Selector } from '../../../../../Components/Form/Selector'
import { Textarea } from '../../../../../Components/Form/Textarea'
import { Lable } from '../../../../../Components/Form/Lable'
import { Delete, Save } from '../../../../../Components/Btn'
import DelayLink from '../../../../../Components/DelayLink'
import { Tabs } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function Form() {
  const { TabPane } = Tabs
  const [dataProduct, setDataProduct] = useState({})
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   customAxiosApi.get('images/157')
  //     .then(response => {
  //       const { data } = response.data
  //       setData(data)
  //     })
  // }, [])

  // const newUrls = JSON.parse(data.url)

  const handleOnchange = e => {
    const { value, name } = e.target

    setDataProduct({
      ...dataProduct,
      files: value
    })

    console.log(value)
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
                  value=""
                  titleLabel="Name Product"
                />
              </div>

              <div className="form__product">
                <div className="box-row">
                  <div className="box-6">
                    <GroupInput
                      type="number"
                      name="price"
                      value=""
                      titleLabel="Price"
                    />
                  </div>

                  <div className="box-6">
                    <GroupInput
                      type="number"
                      value=""
                      name="priceSale"
                      titleLabel="Price Sale"
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="box-row">
                  <div className="box-6">
                    <Selector
                      name="group"
                      value=""
                      title="Group"
                    />
                  </div>

                  <div className="box-6">
                    <Selector
                      name="lineage"
                      value=""
                      title="Lineage"
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="form__product-box">
                  <div className="box-checkbox">
                    <input type="checkbox" className="group__checkbox" id="onProduct"/>
                    <Lable
                      htmlFor="onProduct"
                      text="on"
                      className="group__checkbox--title"
                    />
                  </div>

                  <div className="box-checkbox">
                    <input type="checkbox" className="group__checkbox" id="offProduct"/>
                    <Lable
                      htmlFor="offProduct"
                      text="off"
                      className="group__checkbox--title"
                    />
                  </div>
                </div>
              </div>

              <div className="form__product">
                <div className="form__product-box">
                  <div className="box-radio">
                    <input type="radio" className="group__radio" id="newProduct"/>
                    <Lable
                      htmlFor="newProduct"
                      text="New Product"
                      className="group__radio--title"
                    />
                  </div>

                  <div className="box-radio">
                    <input type="radio" className="group__radio" id="hotProduct"/>
                    <Lable
                      htmlFor="hotProduct"
                      text="Hot Product"
                      className="group__radio--title"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="IMAGES" key="2">
            <div className="box-tabs">
              <div className="form__product">
                <div className="box-checkbox">
                  <div className="box-file">
                    <img src="fakepath/xetrang.jpg" alt="" className="box-file__image"/>

                    <input
                      type="file"
                      className="group__files"
                      id="files"
                      onChange={handleOnchange}
                    />

                    <label
                      htmlFor="files"
                      text=""
                      className="group__checkbox--title label-file"
                    >
                      <span className="label-file__icon fas fa-plus" />
                      <span className="label-file__text">
                        Upload
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="DESCRIPTION" key="3">
            <div className="box-tabs">
              <div className="form__product">
                <CKEditor
                  editor={ ClassicEditor }
                  data="<p>Hello from CKEditor 5!</p>"
                  onReady={ editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={ ( event, editor ) => {
                      // const data = editor.getData();
                      // console.log( { event, editor, data } );
                  } }
                  onBlur={ ( event, editor ) => {
                      console.log( 'Blur.', editor );
                  } }
                  onFocus={ ( event, editor ) => {
                      console.log( 'Focus.', editor );
                  } }
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
                        delay={1000}
                        children={<Delete/>}
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
