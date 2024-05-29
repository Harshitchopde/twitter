
import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCards";
import TweeterLayout from "@/components/Layouts/TweeterLayout";
import { Tweet, User } from "@/gql/graphql";
import { getUserById } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useParams } from "next/navigation";

import { FaArrowLeftLong } from "react-icons/fa6";
interface ServerProps{
    userInfo?:User
}
const UserProfilePage:NextPage<ServerProps> =(props)=>{
   
    // const router = useRouter();
    const params = useParams();
    console.log("User ",props)

    return (
        <div>
            <TweeterLayout>
                <div>
                    <nav className="flex border  items-center px-5 py-3 border-gray-700">
                    <FaArrowLeftLong  className=" text-2xl "/>
                    <div className=" pl-10">
                        <h1 className=" text-2xl  font-bold">{props.userInfo?.firstName}</h1>
                        <h1 className=" text-gray-400">{props.userInfo?.tweets?.length} post</h1>
                    </div>
                    </nav>
                    <div className=" border border-gray-700">
                        <div className=" w-full  relative  h-48 bg-[#333639]  mb-40 ">
                            <div className=" absolute   -bottom-1/2  flex-col   left-7 ">
                               {props.userInfo?.profilePic && <Image className=" rounded-full" src={props.userInfo?.profilePic} alt="No image!" width={150} height={150}  />}
                               <h1 className=" items-center justify-center  text-2xl w-fit p-1 font-bold">{props.userInfo?.firstName}</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            props.userInfo?.tweets?.map(tweet => <FeedCard data={tweet as Tweet} key={tweet?.id} />)
                        }
                    </div>
                </div>
            </TweeterLayout>
        </div>
    )
} 
export const getServerSideProps:GetServerSideProps<ServerProps> = async(context)=>{
    const id  = context.query.id as string | undefined;
    if(!id) return {notFound:true,props:{user:undefined}}
    const userInfo = await graphqlClient.request(getUserById,{id})
    if(!userInfo?.getUserById)return {notFound:true,props:{user:undefined}}
    return {
      props:{
        userInfo:userInfo.getUserById as User,
      },
    }
  }
export default UserProfilePage;