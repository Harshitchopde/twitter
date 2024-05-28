"use client"
import FeedCard from "@/components/FeedCards";
import TweeterLayout from "@/components/Layouts/TweeterLayout";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import type { NextPage } from "next";
import Image from "next/image";
import { useParams } from "next/navigation";

import { FaArrowLeftLong } from "react-icons/fa6";
const UserProfilePage:NextPage =()=>{
    const {user} = useCurrentUser();
    // const router = useRouter();
    const params = useParams();
    console.log(params)

    return (
        <div>
            <TweeterLayout>
                <div>
                    <nav className="flex border  items-center px-5 py-3 border-gray-700">
                    <FaArrowLeftLong  className=" text-2xl "/>
                    <div className=" pl-10">
                        <h1 className=" text-2xl  font-bold">Harshit Chopde</h1>
                        <h1 className=" text-gray-400">1 post</h1>
                    </div>
                    </nav>
                    <div className=" border border-gray-700">
                        <div className=" w-full  relative  h-48 bg-[#333639]  mb-40 ">
                            <div className=" absolute   -bottom-1/2  flex-col   left-7 ">
                               {user?.profilePic && <Image className=" rounded-full" src={user?.profilePic} alt="No image!" width={150} height={150}  />}
                               <h1 className=" items-center justify-center  text-2xl w-fit p-1 font-bold">{user?.firstName}</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            user?.tweets?.map(tweet => <FeedCard data={tweet as Tweet} key={tweet?.id} />)
                        }
                    </div>
                </div>
            </TweeterLayout>
        </div>
    )
} 
export default UserProfilePage;