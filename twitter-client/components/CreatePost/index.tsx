import { graphqlClient } from '@/clients/api';
import { getSignedURLForTweetQuery } from '@/graphql/query/tweet';
import { useCreateTweets, useGetAllTweets } from '@/hooks/tweer';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlinePicture } from "react-icons/ai";
const CreatePost:React.FC = ()=>{
    const { mutateAsync} = useCreateTweets();
    
    const [content,setContent] = useState("");
    const [imageURL,setImage] = useState("");
    const handleCreateTweetBtn =useCallback(async ()=>{
          await mutateAsync({
                content,
                imageURl:imageURL
            })
            setContent("")
            setImage("")
        },[mutateAsync,content,imageURL])
       

   
    const handleInputChangeFile = useCallback((
        input:HTMLInputElement
    )=>{
        return async (event:Event)=>{
            event.preventDefault();
            const file:File | null | undefined = input.files?.item(0);
            // console.log(input.files?.[0])
            if(!file)return;
            console.log(file)
             const type = file.type.split("/")[1]
         
                const {getSignedURLForTweet} = await graphqlClient.request(getSignedURLForTweetQuery,{
                    imageName:file.name,
                    imageType:type
                })
                console.log(getSignedURLForTweet)
          
            if(getSignedURLForTweet){
                toast.loading("Uploading...",{id:"1"})
               const res =  await axios.put(getSignedURLForTweet,file,{
                    headers:{
                        'Content-Type':file.type
                    }
                })
                toast.success("Uploaded",{id:"1"})
                // console.log(res);
            }
            const url = new URL(getSignedURLForTweet as string);
            const myImagePath = `${url.origin}${url.pathname}`
            console.log(myImagePath)
            setImage(myImagePath)

        }
    },[setImage])
    const handleSelectImage = useCallback(()=>{
        const input = document.createElement("input");
        input.setAttribute("type","file")
        input.setAttribute("accept","image/*")
        const handleImageFn = handleInputChangeFile(input)
        input.addEventListener("change",handleImageFn)
        input.click();

    },[handleInputChangeFile])

    return <div className="">
        <div  className='grid grid-cols-12  border-b  border-gray-800  p-4 cursor-pointer'>
        <div className=" col-span-1 ">
            <div className="">
            <Image src="https://avatars.githubusercontent.com/u/109473586?v=4" className=' rounded-full' alt='avater-img' height={50} width={50}/>
            </div>
        </div>
        <div className="className=' w-full col-span-11    text-2xl pt-2 ' ">
        <textarea
         value={content}
         className='outline-none bg-transparent '
         onChange={(e)=>setContent(e.target.value)}
         placeholder='What is happening?!' rows={4}></textarea>
          {
            imageURL && <Image width={400} height={300} src={imageURL} alt='Not found!' />
    }
        </div>
       
    </div>
    <div className=" flex   px-6 my-3   items-center justify-between">
        <AiOutlinePicture onClick={handleSelectImage} className=' text-2xl    ml-11 text-blue-500 cursor-pointer'/>
        <button 
        onClick={handleCreateTweetBtn}
        className="bg-[#1D9BF0]  px-6 py-3 text-[20px] rounded-full mt-2   opacity-40 font-bold">Post</button>

    </div>
    </div>
}
export default CreatePost;