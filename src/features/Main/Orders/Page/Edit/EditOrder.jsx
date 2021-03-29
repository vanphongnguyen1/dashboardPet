import { useState, useEffect } from 'react'
import { Input } from '../../../../../Components/Form/Input'
import { Lable } from '../../../../../Components/Form/Lable'
import { ValidaError } from '../../../../../Components/Form/ValidaError'
import TableItem from './TableItem'
import Totals from './Totals'
import { Delete, Save } from '../../../../../Components/Btn'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStatus } from '../../../../../rootReducers/statusSlice'
import { fetchTrasport } from '../../../../../rootReducers/trasportSlice'

const EditOrder = ()  =>{
  const dispatch = useDispatch()
  const dataStatus = useSelector(state => state.status)
  const dataTrasport = useSelector(state => state.trasport)

  const initial = {
    name: '',
    phone: '',
    address: '',
    status: '',

    trasport: {
      name: '',
      price: ''
    },

    products: [
      {
        id: 2,
        name: '',
        price: '',
        count: '',
        totalPrice: '',

      }
    ],

    sum: '',
    total: ''
  }

  useEffect(() => {
    dispatch(fetchStatus())
    dispatch(fetchTrasport())
  }, [dispatch])

  return (
    <>
      <div className="edit-order">
        <div className="edit-order__heading">
          Order
        </div>

        <div className="box-row">
          <div className="box-5">
            <div className="edit-order__box">
              <span className="edit-order__box--text">
                Date: 29-03-2021
              </span>

              <div className="group">
                <select
                  name="status"
                  className="group__select"
                  // onChange={handleOnChange}
                  // value={state.role}
                >
                  {
                    dataStatus.loading === 'success'
                      ? (
                          dataStatus.list.map(item => {
                            return (
                              <option
                                value={item.id}
                                key={item.id}
                                >
                                  { item.name}
                              </option>
                            )
                          })
                      ) : ''
                  }

                </select>
                <Lable
                  text="Status"
                  className='group__label label-input-value'
                  />
              </div>

              <div className="group">
                <select
                  name="trasport"
                  className="group__select"
                  // onChange={handleOnChange}
                  // value={state.role}
                >
                  {
                    dataTrasport.loading === 'success'
                      ? (
                          dataTrasport.list.map(item => {
                            return (
                              <option
                                value={item.id}
                                key={item.id}
                                >
                                  { item.name}
                              </option>
                            )
                          })
                      ) : ''
                  }
                </select>

                <Lable
                  text="Trasport"
                  className='group__label label-input-value'
                />
              </div>
            </div>
          </div>

          <div className="box-7">
            <div className="edit-order__box">
              <p className="edit-order__box--title">
                Customer
              </p>

              <div className="group">
          <Input
            type="text"
            name="email"
              className='group__input'
            // className={`
            //   group__input
            //   ${
            //     validate.email
            //     ? 'valide-input'
            //     : ''
            //   }
            // `}
            // value={ state.email }
            // onBlur={handleOnBlur}
            // onChange={handleOnChange}
          />

          <Lable
            text="Email *"
            className='group__label'
            // className={`
            //   group__label
            //   ${
            //     state.email && validate.email
            //     ? 'label-input-value valide-label'
            //     : state.email
            //     ? 'label-input-value'
            //     : validate.email
            //     ? 'valide-label'
            //     : ''
            //   }
            // `}
          />
<span className="pseudo-input" />
          {/* {
            validate.email ? (
              <ValidaError
                className="group__valide"
                // text={validate.email}
              />

            ) : (
              <span className="pseudo-input" />
            )
          } */}
        </div>
              <div className="group">
          <Input
            type="text"
            name="email"
              className='group__input'
            // className={`
            //   group__input
            //   ${
            //     validate.email
            //     ? 'valide-input'
            //     : ''
            //   }
            // `}
            // value={ state.email }
            // onBlur={handleOnBlur}
            // onChange={handleOnChange}
          />

          <Lable
            text="Email *"
            className='group__label'
            // className={`
            //   group__label
            //   ${
            //     state.email && validate.email
            //     ? 'label-input-value valide-label'
            //     : state.email
            //     ? 'label-input-value'
            //     : validate.email
            //     ? 'valide-label'
            //     : ''
            //   }
            // `}
          />
<span className="pseudo-input" />
          {/* {
            validate.email ? (
              <ValidaError
                className="group__valide"
                // text={validate.email}
              />

            ) : (
              <span className="pseudo-input" />
            )
          } */}
        </div>
              <div className="group">
          <Input
            type="text"
            name="email"
              className='group__input'
            // className={`
            //   group__input
            //   ${
            //     validate.email
            //     ? 'valide-input'
            //     : ''
            //   }
            // `}
            // value={ state.email }
            // onBlur={handleOnBlur}
            // onChange={handleOnChange}
          />

          <Lable
            text="Email *"
            className='group__label'
            // className={`
            //   group__label
            //   ${
            //     state.email && validate.email
            //     ? 'label-input-value valide-label'
            //     : state.email
            //     ? 'label-input-value'
            //     : validate.email
            //     ? 'valide-label'
            //     : ''
            //   }
            // `}
          />
            <span className="pseudo-input" />
          {/* {
            validate.email ? (
              <ValidaError
                className="group__valide"
                // text={validate.email}
              />

            ) : (
              <span className="pseudo-input" />
            )
          } */}
        </div>

            </div>
          </div>
        </div>

        <div className="edit-order__box">
          <p className="edit-order__box--title">Items</p>

          <TableItem />
        </div>

        <div className="edit-order__box">
          <p className="edit-order__box--title">Totals</p>

          <Totals />
        </div>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save">
              <Save />
            </div >
            <div className="box-submit__delete">
              <Delete/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditOrder
