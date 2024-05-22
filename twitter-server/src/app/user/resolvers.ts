import { PrismaClient } from "@prisma/client";
import axios from "axios" 
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";

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
 
}
export const resolvers = {queries}

   // haloChalo:async(parent:any ,{hello,kha}:{hello:string,kha:string})=>{
    //     return hello+" "+kha;
    // }