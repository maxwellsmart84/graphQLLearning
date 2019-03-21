const Post = {
  author (parent, args, { db }, info) {
    const { author } = parent
    return db.users.find((user) => {
      const { id } = user
      return id === author
    })
  },
  comments (parent, args, { db }, info) {
    const { id } = parent
    return db.comments.filter((comment) => {
      const { post } = comment
      return id === post
    })
  }
}

export default Post
