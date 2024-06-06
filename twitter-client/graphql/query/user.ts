import { graphql } from "../../gql";

export const  verifyGoogleTokenQuery = graphql(`
query Query($token: String!) {
  verifyGoogleToken(token: $token)
}
  
`)
export const getCurrentUserQuery = graphql(` 
query GetCurrentUser {
  getCurrentUser {
    id
    firstName
    lastName
    email
    profilePic
    followers {
      id
      firstName
      profilePic
    }
    following {
      id
      firstName
      profilePic
    }
    tweets {
      content
      id
      imageURL
      author {
        profilePic
        firstName
        id
      }
      
    }
  }
}

`)
export const getUserById = graphql(`
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    id
    firstName
    lastName
    profilePic
    followers {
      id
      firstName
      profilePic
    }
    following {
      id
      firstName
      profilePic
    }
    tweets {
      id
      content
      author {
        profilePic
        firstName
        lastName
        id
      }
      imageURL
    }
  }
}
`)
