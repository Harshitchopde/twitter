import { graphql } from "../../gql";

export const  verifyGoogleTokenQuery = graphql(`#graphql
    query ExampleQuery($token: String!) {

        verifyGoogleToken(token: $token)
        
    }
  
`)