import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser (parent, args, { db }, info) {
    const { data: { email } } = args
    const emailTaken = db.users.some((user) => user.email === email)
    if (emailTaken) {
      throw new Error('Email taken')
    }
    const user = {
      id: uuidv4(),
      ...args
    }
    db.users.push(user)
    return user
  },
  deleteUser (parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    const [ deletedUser ] = db.users.splice(userIndex, 1)
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id
      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id)
      }
      return !match
    })
    db.comments = db.comments.filter((comment) => comment.author !== args.id)
    return deletedUser
  },
  updateUser (parent, { id, data }, { db }, info) {
    const user = db.users.find((user) => id === user.id)
    if (!user) {
      throw new Error('User not found')
    }
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email)
      if (emailTaken) {
        throw new Error('Email taken')
      }
      user.email = data.email
    }
    if (typeof data.name === 'string') {
      user.name = data.name
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }
    return user
  },
  createPost (parent, args, { db }, info) {
    const { data: { author } } = args
    const userExists = db.users.some((user) => user.id === author)
    if (!userExists) throw new Error('User not found.')
    const post = {
      id: uuidv4(),
      ...args
    }
    db.posts.push(post)
    return post
  },
  deletePost (parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id)
    if (postIndex === -1) {
      throw new Error('Post not found')
    }
    const [ deletedPost ] = db.posts.splice(postIndex, 1)
    db.comments = db.comments.filter((comment) => comment.post !== args.id)
    return deletedPost
  },
  updatePost (parent, { id, data }, { db }, info) {
    const post = db.posts.find((post) => id === post.id)
    if (!post) {
      throw new Error('Post not found')
    }
    if (typeof data.author === 'string') {
      const foundAuthor = db.users.find((user) => user.id === data.author)
      if (!foundAuthor) {
        throw new Error('No Author with that ID')
      }
    }
    if (typeof data.title === 'string') {

    }
  },
  createComment (parent, args, { db }, info) {
    const { data: { author, post } } = args
    const userExists = db.users.some((user) => user.id === author)
    if (!userExists) throw new Error('User not found.')
    const postExists = db.posts.some((p) => p.id === post && p.published)
    if (!postExists) throw new Error('User not found.')
    const comment = {
      id: uuidv4(),
      ...args
    }
    db.comments.push(comment)
    return comment
  },
  deleteComment (parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)
    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }
    const [ deletedComment ] = db.comments.splice(commentIndex, 1)
    return deletedComment
  }
}

export default Mutation
