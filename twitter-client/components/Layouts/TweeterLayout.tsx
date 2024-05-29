
import React, { useMemo } from 'react'
import Image from "next/image";

import { FaTwitter, FaXTwitter } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { CiCircleMore, CiSearch } from "react-icons/ci";
import { BsPeople, BsSlashSquare } from "react-icons/bs";
import { LiaClipboardListSolid } from "react-icons/lia";
import { LuMessageSquare } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useCallback } from "react";
import toast from 'react-hot-toast';
import { graphqlClient } from "@/clients/api";
import { verifyGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from 'next/link';
import { link } from 'fs';

interface TweeterLayoutProps {
  children: React.ReactNode,
}
interface TwitterSideBar {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TweeterLayout: React.FC<TweeterLayoutProps> = (props) => {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();
  // console.log("USer: ",user)
  const sideBarMenuItems: TwitterSideBar[] = useMemo(() => [
    {
      title: "Home",
      icon: <GoHome />,
      link: "/"
    },
    {
      title: "Explore",
      icon: <CiSearch />,
      link: "/"
    },
    {
      title: "Notification",
      icon: <IoMdNotificationsOutline />,
      link: "/"
    },
    {
      title: "Messages",
      icon: <LuMessageSquare />,
      link: "/"
    },
    {
      title: "Grok",
      icon: <BsSlashSquare />,
      link: "/"
    },
    {
      title: "Lists",
      icon: <LiaClipboardListSolid />,
      link: "/"
    },
    {
      title: "Communities",
      icon: <BsPeople />,
      link: "/"
    },
    {
      title: "Premium",
      icon: <FaXTwitter />,
      link: "/"
    },
    {
      title: "Profile",
      icon: <IoPersonOutline />,
      link: `/${user?.id}`
    },
    {
      title: "More",
      icon: <CiCircleMore />,
      link: "/"
    },
  ]
    , [user?.id]);
    // console.log(sideBarMenuItems)

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    console.log("Google login")
    const googleToken = cred.credential;
    console.log("googleToken : ", googleToken)
    if (!googleToken) return toast.error('Can not find the token')
    const { verifyGoogleToken } = await graphqlClient.request(verifyGoogleTokenQuery, { token: googleToken })
    toast.success("Login Successfull", { duration: 4000, position: "top-center" })
    // return verifyGoogleToken;
    if (verifyGoogleToken) {
      window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }
  }, [queryClient])
  return (
    <div>

      <div className="grid grid-cols-12  w-screen h-screen sm:px-56 relative">
        <div className=" col-span-2 sm:col-span-3   relative ">
          <div className="  hover:bg-slate-900 transition-all cursor-pointer mt-8 h-fit w-fit text-3xl rounded-full p-3 px-5">
            <FaTwitter />
          </div>

          <ul>
            {sideBarMenuItems.map(item => {
              return (
                <Link href={item.link} key={item.title} className="flex gap-6 align-middle hover:bg-gray-800 w-fit px-4 py-3 rounded-full">
                    <span className="text-4xl">{item.icon}</span>
                    <span className=" hidden sm:block text-2xl">{item.title}</span>
                </Link>
              )
            }
            )}
          </ul>
          <button className="bg-[#1D9BF0] hidden sm:block px-32 py-3 text-[20px] rounded-full mt-2 hover:opacity-90 font-bold">Post</button>
          <button className="bg-[#1D9BF0] block sm:hidden   px-3 py-3 text-[20px] rounded-full mt-2 hover:opacity-90 font-bold"> <FaTwitter /></button>
          {user && <div className="flex hover:bg-slate-900 rounded-xl  cursor-pointer w-4/5 absolute bottom-4   p-2">
            {user.profilePic && <Image src={user.profilePic} width={50} height={50} className=" rounded-full" alt="No Image Found!" />}
            <div className=" hidden sm:block pl-4   text-center  flex-col   align-middle font-extrabold   text-lg">
              <h3 >{user.firstName}</h3>
              <h3>{user.lastName}</h3>
            </div>

          </div>}

        </div>
        <div className=" col-span-9 sm:col-span-6 border-x-[1px]   h-screen overflow-y-scroll  border-x-gray-600" >
          {props.children}
        </div>
        <div className=" sm:col-span-3 p-5">
          {!user && <div className="border p-5 bg-slate-700 rounded-xl  text-center">
            <h1 className=" text-black   font-bold p-3">Login with Google</h1>
            <div className=" pl-10">
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          </div>}
        </div>
      </div>
    </div>
  )

}
export default TweeterLayout;