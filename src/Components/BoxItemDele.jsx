import { Delete } from './Btn'

const BoxItemDele = props => {
  const { items } = props

  return (
    <div className={items.length>0 ? 'box-delete translateY-ux' : 'box-delete'}>
      <div className="box-delete__title">
        <span className="box-delete__title--icon far fa-times" />
        <span className="box-delete__title--text">{items.length} Items selected</span>
      </div>
      <div className="box-delete__item">
        <Delete />
      </div>
    </div>
  )
}

export default BoxItemDele
