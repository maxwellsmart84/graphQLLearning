const users = [{
  id: '1',
  name: 'Maxwell Krause',
  email: 'test@tests.com',
  age: 35
}, {
  id: '2',
  name: 'Author 2',
  email: 'test2@tests.com'
}, {
  id: '3',
  name: 'Author 3',
  email: 'test3@tests.com'
}, {
  id: '4',
  name: 'Author 4',
  email: 'test4@tests.com'
}]

const posts = [{
  id: '1',
  title: 'The First Post',
  body: 'The first post body.',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'The Second Post',
  body: 'The second post body.',
  published: false,
  author: '1'
}, {
  id: '3',
  title: 'The Third Post',
  body: 'The third post body.',
  published: false,
  author: '3'
}]

const comments = [{
  id: '1',
  text: 'Comment one',
  author: '1',
  post: '1'
}, {
  id: '2',
  text: 'Comment two',
  author: '2',
  post: '1'
},
{
  id: '3',
  text: 'Comment three',
  author: '3',
  post: '3'
},
{
  id: '4',
  text: 'Comment four',
  author: '1',
  post: '2'
}]

const db = {
  users,
  comments,
  posts
}

export default db
