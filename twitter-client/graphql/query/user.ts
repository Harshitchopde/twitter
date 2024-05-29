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