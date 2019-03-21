const Query = {
  users (parents, args, { db }, info) {
    const { query } = args
    let newUsers = !query ? db.users : db.users.filter((user) => {
      const { name } = user
      return name.toLowerCase().includes(query.toLowerCase())
    })
    return newUsers
  },

  posts (parents, args, { db }, info) {
    const { query } = args
    let newPosts = !query ? db.posts : db.posts.filter((post) => {
      const { body, title } = post
      return body.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase())
    })
    return newPosts
  },

  comments (parents, args, { db }, info) {
    return db.comments
  }
}

export default Query
