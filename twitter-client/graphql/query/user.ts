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
      profilePic
      email
    }
  }

`)