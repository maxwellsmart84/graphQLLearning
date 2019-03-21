const User = {
  posts (parent, args, { db }, info) {
    const { id } = parent
    return db.posts.filter((post) => {
      const { author } = post
      return author === id
    })
  },
  comments (parent, args, { db }, info) {
    const { id } = parent
    return db.comments.filter((comment) => {
      const { author } = comment
      return author === id
    })
  }
}

export default User
