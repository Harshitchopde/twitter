import { User } from "@prisma/client";
import Jwt from "jsonwebtoken";
const JWT_SECRET = "a$W$TGS%55sg5e"
class JWTService{
        public static generateTokenForUser(user:User){
            const payload = {
                id:user.id,
                email:user.email,
            }
           
           const token =  Jwt.sign(payload,JWT_SECRET);
           return token;
        }
}

export default JWTService;