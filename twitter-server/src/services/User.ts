import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "./jwt";
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
class UserService{
    public static async verifyGoogleAuthToken(token:string){
        const GoogleOuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
        GoogleOuthURL.searchParams.set("id_token",token);
        // console.log(GoogleOuthURL.toString())
        const {data} = await axios.get<GoogleTokenResult>(GoogleOuthURL.toString(),{
            responseType:"json"
        })
        const user = await UserService.getUserByEmail(data.email);
        // console.log("user : ",user);
         // if user not exist then create
         if(!user){
           await UserService.createUser(data.email,data.given_name,data.picture as string)
        }
        const userForDb = await UserService.getUserByEmail(data.email);
        if(!userForDb)throw new Error("User Not found with this email -> "+data.email);
        const jwtToken = JWTService.generateTokenForUser(userForDb);
        return jwtToken;

    }
    public static async getUserByEmail(email:string){
        return await prismaClient.user.findUnique({
            where:{email:email}
        })
    }
    public static async createUser(email:string,firstName:string,profilePic:string){
        return await prismaClient.user.create({
            data:{
                email,
                firstName,
                profilePic
            }
        })
    }
    public static async getUserById(id:string){
        return await prismaClient.user.findUnique({where:{id:id}});
    }
}
export default UserService;