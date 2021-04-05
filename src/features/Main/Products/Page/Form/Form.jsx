// import React, { useEffect, useState } from 'react'
// import { customAxiosApi } from '../../../../../customAxiosApi'
import { HeadingBox } from '../../../../../Components/HeadingBox'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Selector } from '../../../../../Components/Form/Selector'
import { Textarea } from '../../../../../Components/Form/Textarea'
import { Lable } from '../../../../../Components/Form/Lable'
import { Delete, Save } from '../../../../../Components/Btn'
import DelayLink from '../../../../../Components/DelayLink'

function Form() {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   customAxiosApi.get('images/157')
  //     .then(response => {
  //       const { data } = response.data
  //       setData(data)
  //     })
  // }, [])

  // const newUrls = JSON.parse(data.url)

  return (
    <>
      <HeadingBox title="Add Product"/>
      <form className="form">
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
          <div className="box-checkbox">
              <input type="file" className="group__files" id="files"/>

              <Lable
                htmlFor="files"
                text="Images Product"
                className="group__checkbox--title"
              />
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

        <div className="form__product">
          <Textarea
            name="info"
            value=""
            title="info"
          />
        </div>

        <div className="form__product">
          <Textarea
            name="discription"
            value=""
            title="Discription"
          />
        </div>

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
