import axios from "axios" 

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
        const {data} = await axios.get<GoogleTokenResult>(GoogleOuthURL.toString(),{
            responseType:"json"
        })
        console.log(data.email_verified)


        return "token recieved"
    },
 
}
export const resolvers = {queries}

   // haloChalo:async(parent:any ,{hello,kha}:{hello:string,kha:string})=>{
    //     return hello+" "+kha;
    // }