export const Create = () => {
  return (
    <span className="btn btn__create">
      <span className="btn__create--icon fas fa-plus" />
      <span className="btn__create--text">Create</span>
    </span>
  )
}

export const Delete = () => {
  return (
    <div className="btn__delete">
      <span className="btn__delete--icon fas fa-trash" />
      <span className="btn__delete--text">delete</span>
    </div>
  )
}

export const Save = () => {
  return (
    <span className="btn__save">
      <span className="btn__save--icon fas fa-save" />
      <span className="btn__save--text">Save</span>
    </span>
  )
}
