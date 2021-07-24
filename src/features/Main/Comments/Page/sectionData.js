import PropTypes from 'prop-types'
import { STATUS_HANDLE } from '../../../../dataDefault'

export const sectionData = (dataComments) => {
  const dataPending = []
  const dataAccepted = []
  const dataRejected = []

  dataComments.forEach((comment) => {
    const { users, products, status_comments } = comment

    const newComment = {
      id: comment.id,
      userName: users.name,
      title: comment.title,
      nameProduct: products.name,
      statusComments: status_comments.name,

      usersID: comment.usersID,
      productsID: comment.productsID,
      statusCommentsID: comment.statusCommentsID,

      created: comment.created_at,
      updated: comment.updated_at,
    }

    if (newComment.statusComments === STATUS_HANDLE.PENDING) {
      dataPending.push(newComment)
    }

    if (newComment.statusComments === STATUS_HANDLE.ACCEPTED) {
      dataAccepted.push(newComment)
    }

    if (newComment.statusComments === STATUS_HANDLE.REJECTED) {
      dataRejected.push(newComment)
    }
  })

  return [dataPending, dataAccepted, dataRejected]
}

sectionData.propTypes = {
  dataComments: PropTypes.array,
}

sectionData.defaultProps = {
  dataComments: [],
}
