import { PrismaClient, User } from "@prisma/client";
import axios from "axios" 
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";
import UserService from "../../services/User";
import TweetService from "../../services/Tweet";




const queries = {
    verifyGoogleToken: async(parent:any ,{token}:{token:string})=>{
       return UserService.verifyGoogleAuthToken(token);
    },
    getCurrentUser: async(parent:any, args:any, ctx:GraphqlContext)=>{
        // console.log(ctx)
        const id = ctx.user?.id
        if(!id)return null
        const resUser = UserService.getUserById(id);
        if(!resUser) return "User Not Found!"
        return resUser 
    },
    getUserById: async (parent:any, {id}:{id:string},ctx:GraphqlContext)=>{
        return await UserService.getUserById(id);
    }
 
}
const extraQueryResolver = {
    User:{
        // tweets:(parent:User)=> prismaClient.tweet.findMany({where:{id:parent.id}})
        // tweets:(parent:User)=> prismaClient.tweet.findMany({where:{authorId:parent.id}})
        tweets:(parent:User) =>  TweetService.getManyByParentId(parent.id)
    }
}
export const resolvers = {queries,extraQueryResolver}

   // haloChalo:async(parent:any ,{hello,kha}:{hello:string,kha:string})=>{
    //     return hello+" "+kha;
    // }