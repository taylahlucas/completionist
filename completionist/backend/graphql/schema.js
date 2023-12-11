const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Subscription {
    id: String
    isActive: Boolean
  }

  type Item {
    id: String
    isComplete: Boolean
  }

  input ItemInput {
    id: String
    isComplete: Boolean
  }

  type SkyrimData {
    quests: [Item]
    collectables: [Item]
    books: [Item]
    locations: [Item]
  }


  type UserData {
    skyrim: SkyrimData
  }

  type UserData {
    id: String
    userId: String
    name: String
    email: String
    userAvatar: String
    subscription: [Subscription]
    data: UserData
  }

  type Mutation {
    createUser(userId: String!, name: String!, email: String!, userAvatar: String): UserData
    updateSkyrimData(userId: String!, quests: [ItemInput]!, collectables: [ItemInput]!, books: [ItemInput]!, locations: [ItemInput]!): UserData
  }

  type Query {
    getUserById(userId: String!): UserData
  }
`;

module.exports = typeDefs;