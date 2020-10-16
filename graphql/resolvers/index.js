const posts = require("./posts");
const users = require("./users");
const comments = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...posts.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...posts.Mutation,
    ...comments.Mutation,
  },
  Subscription: {
    ...posts.Subscription,
  },
};
