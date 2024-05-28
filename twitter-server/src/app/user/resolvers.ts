import { PrismaClient, User } from "@prisma/client";
import axios from "axios" 
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";


interface GoogleTokenResult {
    iss?: string;
    azp?: string;
    aud?: string
    sub?: string; 
    email: string
    email_verified: string
    nbf?:  string;
    name: string;
    picture?: string 
    given_name: string;
    iat?: string; 
    exp?: string;
    jti?: string;
    alg?: string; 
    kid?: string;
    typ?: string;
}

const queries = {
    verifyGoogleToken: async(parent:any ,{token}:{token:string})=>{
        const GoogleToken = token;
        const GoogleOuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
        GoogleOuthURL.searchParams.set("id_token",GoogleToken);
        // console.log(GoogleOuthURL.toString())
        const {data} = await axios.get<GoogleTokenResult>(GoogleOuthURL.toString(),{
            responseType:"json"
        })
       
        const user = await prismaClient.user.findUnique({
            where:{email:data.email},
        })

        // if user not exist then create
        if(!user){
            await prismaClient.user.create({
                data:{
                    email:data.email,
                    firstName:data.given_name,
                    profilePic: data.picture,
                }
            })

        }
        const userDb = await prismaClient.user.findUnique({where: {email:data.email}});
        if(!userDb) throw new Error("User not found with this email-> "+data.email)
        const jwtToken = JWTService.generateTokenForUser(userDb);


        return jwtToken;
    },
    getCurrentUser: async(parent:any, args:any, ctx:GraphqlContext)=>{
        // console.log(ctx)
        const id = ctx.user?.id
        if(!id)return null
        const resUser = await prismaClient.user.findUnique({where:{id}});
        if(!resUser) return "User Not Found!"
        return resUser 
    },
    getUserById: async (parent:any, {id}:{id:string},ctx:GraphqlContext)=>{
        return await prismaClient.user.findUnique({where:{id}});
    }
 
}
const extraQueryResolver = {
    User:{
        // tweets:(parent:User)=> prismaClient.tweet.findMany({where:{id:parent.id}})
        tweets:(parent:User)=> prismaClient.tweet.findMany({where:{authorId:parent.id}})
    }
}
export const resolvers = {queries,extraQueryResolver}

   // haloChalo:async(parent:any ,{hello,kha}:{hello:string,kha:string})=>{
    //     return hello+" "+kha;
    // }