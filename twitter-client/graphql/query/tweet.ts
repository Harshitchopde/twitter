import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`

query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profilePic
      }
    }
  }
`)
export const getSignedURLForTweetQuery = graphql(`
query getSignedURL($imageName: String!, $imageType: String!) {
  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
}
`)