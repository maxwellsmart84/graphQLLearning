const Comment = {
  author (parent, args, { db }, info) {
    const { author } = parent
    return db.users.find((user) => {
      const { id } = user
      return id === author
    })
  },
  post (parent, args, { db }, info) {
    const { post } = parent
    return db.posts.find((p) => {
      const { id } = p
      return id === post
    })
  }
}

export default Comment
