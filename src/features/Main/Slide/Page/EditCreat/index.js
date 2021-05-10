import Form from '../Form'

const EditCreat = ({ match }) => {
  const { url } = match

  return (
    <div>
      <div className="from-product box-7">
        <Form url={url} />
      </div>
    </div>
  )
}

export default EditCreat
