"use client"
import Image from "next/image";
import { FaTwitter, FaXTwitter } from "react-icons/fa6";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { CiCircleMore, CiSearch } from "react-icons/ci";
import { BsPeople, BsSlashSquare } from "react-icons/bs";
import { LiaClipboardListSolid } from "react-icons/lia";
import { LuMessageSquare } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google"
import FeedCard from "@/components/FeedCards";
import { useCallback } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { graphqlClient } from "@/clients/api";
import { verifyGoogleTokenQuery } from "@/graphql/query/user";
interface TwitterSideBar{
  title:string;
  icon:React.ReactNode;
}
const sideBarMenuItems:TwitterSideBar[]=[
  {
    title:"Home",
    icon:<GoHome/>,
  },
  {
    title:"Explore",
    icon:<CiSearch />
  },
  {
    title:"Notification",
    icon:<IoMdNotificationsOutline/>,
  },
  {
    title:"Messages",
    icon:<LuMessageSquare/>
  },
  {
    title:"Grok",
    icon:<BsSlashSquare/>,
  },
  {
    title:"Lists",
    icon:<LiaClipboardListSolid  />
  },
  {
    title:"Communities",
    icon:<BsPeople />,
  },
  {
    title:"Premium",
    icon:<FaXTwitter/>
  },
  {
    title:"Profile",
    icon:<IoPersonOutline />,
  },
  {
    title:"More",
    icon:<CiCircleMore/>
  },
]
export default function Home() {
  const handleLoginWithGoogle = useCallback(async(cred:CredentialResponse)=>{
    const googleToken = cred.credential;
    if(!googleToken)return toast.error('Can not find the token')
      const {verifyGoogleToken} = await graphqlClient.request(verifyGoogleTokenQuery,{token:googleToken})
    console.log(verifyGoogleToken)
    toast.success("Login Successfull",{duration:4000,position:"top-center"})
    // return verifyGoogleToken;
    
    
  },[])
  return (
   <div>
    <div className="grid grid-cols-12  w-screen h-screen px-56 relative">
      <div className=" col-span-3  ">
        <div className="  hover:bg-slate-900 transition-all cursor-pointer mt-8 h-fit w-fit text-3xl rounded-full p-3 px-5">
          <FaTwitter/>
        </div>
      
       <ul>
        {sideBarMenuItems.map(item=>{ 
        return (<li key={item.title} className="flex gap-6 align-middle hover:bg-gray-800 w-fit px-4 py-3 rounded-full">
          <span className="text-4xl">{item.icon}</span>
          <span className=" text-2xl">{item.title}</span></li>)}
        )}
        </ul>
        <button className="bg-[#1D9BF0]  px-32 py-3 text-[20px] rounded-full mt-2 hover:opacity-90 font-bold">Post</button>
      </div>
      <div className=" col-span-6 border-x-[1px]   h-screen overflow-y-scroll  border-x-gray-600" >
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </div>
      <div className=" col-span-3 p-5">
        <div className="border p-5 bg-slate-700 rounded-xl  text-center">
          <h1 className=" text-black   font-bold p-3">Login with Google</h1>
          <div className=" pl-10">
          <GoogleLogin onSuccess={handleLoginWithGoogle}/>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
