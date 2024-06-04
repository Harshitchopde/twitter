/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    " \nmutation Mutation($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n\n": types.MutationDocument,
    "\n\nquery GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profilePic\n      }\n    }\n  }\n": types.GetAllTweetsDocument,
    "\nquery getSignedURL($imageName: String!, $imageType: String!) {\n  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n}\n": types.GetSignedUrlDocument,
    "\nquery Query($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n  \n": types.QueryDocument,
    " \nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    firstName\n    lastName\n    email\n    profilePic\n    tweets {\n      content\n      id\n      imageURL\n      author {\n        profilePic\n        firstName\n        id\n      }\n      \n    }\n  }\n}\n\n": types.GetCurrentUserDocument,
    "\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    profilePic\n    tweets {\n      id\n      content\n      author {\n        profilePic\n        firstName\n        lastName\n        id\n      }\n      imageURL\n    }\n  }\n}\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \nmutation Mutation($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n\n"): (typeof documents)[" \nmutation Mutation($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\nquery GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profilePic\n      }\n    }\n  }\n"): (typeof documents)["\n\nquery GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      author {\n        id\n        firstName\n        lastName\n        profilePic\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getSignedURL($imageName: String!, $imageType: String!) {\n  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n}\n"): (typeof documents)["\nquery getSignedURL($imageName: String!, $imageType: String!) {\n  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Query($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n  \n"): (typeof documents)["\nquery Query($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    firstName\n    lastName\n    email\n    profilePic\n    tweets {\n      content\n      id\n      imageURL\n      author {\n        profilePic\n        firstName\n        id\n      }\n      \n    }\n  }\n}\n\n"): (typeof documents)[" \nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    firstName\n    lastName\n    email\n    profilePic\n    tweets {\n      content\n      id\n      imageURL\n      author {\n        profilePic\n        firstName\n        id\n      }\n      \n    }\n  }\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    profilePic\n    tweets {\n      id\n      content\n      author {\n        profilePic\n        firstName\n        lastName\n        id\n      }\n      imageURL\n    }\n  }\n}\n"): (typeof documents)["\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    profilePic\n    tweets {\n      id\n      content\n      author {\n        profilePic\n        firstName\n        lastName\n        id\n      }\n      imageURL\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;