import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser'
import express from 'express';
import { User } from './user';
import cors from 'cors';
export async function initServer(){
    const app = express();
    app.use(cors())
    app.use(bodyParser.json())
    const grapthQLServer = new ApolloServer({
        typeDefs: `
        ${User.types}
         type Query{
            ${User.queries}
         } 
        `,
        resolvers:{
            Query:{

                ...User.resolvers.queries,
            }
           
        },
    })
    
    await grapthQLServer.start();
    app.use('/graphql',expressMiddleware(grapthQLServer))
    return app;
}