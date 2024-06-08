import { graphql } from "@/gql";

export const createTweetMutation = graphql(` 
mutation Mutation($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }

`)
export const followUserMutation = graphql(
  `
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
  
  `
)
export const unfollowUserMutation = graphql(
  `
  mutation UnfollowUser($to: ID!) {
    unfollowUser(to: $to)
  }
  `
)