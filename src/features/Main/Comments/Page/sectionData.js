import PropTypes from 'prop-types'

export const sectionData = dataComments => {
  const dataPending = []
  const dataAccepted = []
  const dataRejected = []

  dataComments.forEach(comment => {
    const {
      users,
      products,
      status_comments,
    } = comment

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

    if (newComment.statusComments === 'pending') {
      dataPending.push(newComment)
    }

    if (newComment.statusComments === 'accepted') {
      dataAccepted.push(newComment)
    }

    if (newComment.statusComments === 'rejected') {
      dataRejected.push(newComment)
    }
  })

  return [
    dataPending,
    dataAccepted,
    dataRejected
  ]
}

sectionData.propTypes = {
  dataComments: PropTypes.array
}

sectionData.defaultProps = {
  dataComments: []
}
