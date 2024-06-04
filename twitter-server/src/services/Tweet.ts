import { prismaClient } from "../clients/db";
export interface CreateTweetPayload {
    content: string
    imageURl?: string
}
class TweetService{
    public static async getManyByParentId(authorId:string){
        return await prismaClient.tweet.findMany({where:{authorId}})
    }
    public static  getAllTweets(){
        return prismaClient.tweet.findMany({orderBy:{createdAt:"desc"}})
    }
    public static async createTweet(payload:CreateTweetPayload,id:string){
        const tweet = await prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURl,
                author: { connect: { id:id} },

            }
        })
        return tweet;
    }
}
export default TweetService;