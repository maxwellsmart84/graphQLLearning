import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

//demo data

const users = [{
  id: '1',
  name: 'Maxwell Krause',
  email: 'test@tests.com',
  age: 35
}, {
  id: '2',
  name: 'Author 2',
  email: 'test2@tests.com',
}, {
  id: '3',
  name: 'Author 3',
  email: 'test3@tests.com',
}, {
  id: '4',
  name: 'Author 4',
  email: 'test4@tests.com',
}];


const posts = [{
  id: '1',
  title: 'The First Post',
  body: 'The first post body.',
  published: true,
  author: '1',
}, {
  id: '2',
  title: 'The Second Post',
  body: 'The second post body.',
  published: false,
  author: '1',
}, {
  id: '3',
  title: 'The Third Post',
  body: 'The third post body.',
  published: false,
  author: '3',
}];

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
}
, {
  id: '3',
  text: 'Comment three',
  author: '3',
  post: '3',
}
, {
  id: '4',
  text: 'Comment four',
  author: '1',
  post: '2',
}]

// Scalar - String, Boolean, Int, Float, ID (not collections)
// Custom type means you can select what type is returned =
// const typeDefs = `
//  type Query {
//     me: User!
//  }

//  type User {
//    id: ID!
//    name: String!
//    email: String!
//    age: Int
//  }
// `
// Type definitions (schema);
const typeDefs = `
 type Query {
    greeting(name: String, position: String): String!
    users(query: String):[User!]!,
    posts(query: String): [Post!]!,
    comments: [Comment!]!,
    me: User!
    post: Post!
    add(numbers: [Float!]!): Float! ${/* this is accepting arrays */ ''}
    grades: [Int!]! ${/* this is sending arrays  */ ''}
 }

 type Mutation {
  createUser(data: CreateUserInput): User!,
  createPost(data: CreatePostInput): Post!,
  createComment(data: CreateCommentInput): Comment!
 }

 input CreateUserInput {
   name: String!
   email: String!
   age: Int
 }
 input CreatePostInput {
   title: String!
   body: String!
   published: Boolean!
   author: ID!
 }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
}

 type User {
   id: ID!
   name: String!
   email: String!
   age: Int
   posts: [Post!]!
   comments: [Comment!]!
 }

 type Post {
   id: ID!
   title: String!
   body: String!
   author: User!,
   comments: [Comment!]!,
   published: Boolean!
 }

 type Comment {
   id: ID!
   text: String!
   author: User!
   post: Post!
 }
`

// Resolvers - functions that run for each query
const resolvers = {
  Query: {
    users(parents, args, ctx, info) {
      const { query } = args;
      let newUsers = !query ? users : users.filter((user) => {
        const { name } = user;
        return name.toLowerCase().includes(query.toLowerCase());
      })
      return newUsers;
    },

    posts(parents, args, ctx, info) {
      const { query } = args;
      let newPosts = !query ? posts : posts.filter((post) => {
        const { body, title } = post;
        return body.toLowerCase().includes(query.toLowerCase()) ||
          title.toLowerCase().includes(query.toLowerCase());
      })
      return newPosts;
    },

    comments(parents, args, ctx, info) {
      return comments;
    }
    // 4 args passed to resolver functions
    // parent: Relational data
    // args: operational arguments supplied
    // context(ctx): contextual data (id)
    // info: information about the actual operation sent to the server
    // greeting(parent, args, ctx, info) {
    //   const { name, position } = args;
    //   let response = 'Hello!';
    //   response = name && position ? `Hello ${name}. You are my favorite ${position}` :
    //   name ? 'Hello ${name}' :
    //   position ? `You are my favorite ${position}` : response;
    //   return response;
    // },
    // add(parent, args) {
    //   const { numbers } = args;
    //  return numbers.length === 0 ? 0 : numbers.reduce((acc, curr) => acc + curr);
    // },
    // grades(parents, args, ctx, info) {
    //   return [89, 99, 72]
    // },
    // me() {
    //   return {
    //     id: 1,
    //     name: 'Maxwell Krause',
    //     email: 'test@test.com'
    //   }
    // },
  },
  // Mutations for CRUD - similar to Resolvers.
  Mutation: {
    createUser(parent, args, ctx, info) {
      const { data: { email } } = args;
      const emailTaken = users.some((user) => user.email === email);
      if (emailTaken) {
        throw new Error('Email taken');
      }
      const user = {
        id: uuidv4(),
       ...args
      }
      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const { data: { author } } = args;
      const userExists = users.some((user) => user.id === author);
      if (!userExists) throw new Error("User not found.");
      const post = {
        id: uuidv4(),
        ...args
      };
      posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const { data: { author, post } } = args;
      const userExists = users.some((user) => user.id === author);
      if (!userExists) throw new Error("User not found.");
      const postExists = posts.some((p) => p.id === post && p.published);
      if (!postExists) throw new Error("User not found.");
      const comment = {
        id: uuidv4(),
        ...args,
      }
      comments.push(comment);
      return comment;
    }
  },
  // relation mappings
  Post: {
    author(parent, args, ctx, info) {
      const { author } = parent;
      return users.find((user) => {
        const { id } = user;
        return id === author;
      })
    },
    comments(parent, args, ctx, info) {
      const { id } = parent;
      return comments.filter((comment) => {
        const { post } = comment;
        return id === post;
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      const { id } = parent;
      return posts.filter((post) => {
        const { author } = post;
        return author === id;
      })
    },
    comments(parent, args, ctx, info) {
      const { id } = parent;
      return comments.filter((comment) => {
        const { author } = comment;
        return author === id;
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      const { author } = parent;
      return users.find((user) => {
        const { id } = user;
        return id === author;
      })
    },
    post(parent, args, ctx, info) {
      const { post } = parent;
      return posts.find((p) => {
        const { id } = p;
        return id === post;
      })
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('server is up');
})
