import Image from 'next/image';
import React, { useCallback } from 'react'
import { AiOutlinePicture } from "react-icons/ai";
const CreatePost:React.FC = ()=>{
    const handleSelectImage = useCallback(()=>{
        const input = document.createElement("input");
        input.setAttribute("type","file")
        input.setAttribute("accept","image/*")
        input.click();

    },[])

    return <div className="">
        <div  className='grid grid-cols-12  border-b  border-gray-800  p-4 cursor-pointer'>
        <div className=" col-span-1">
            <div className="">
            <Image src="https://avatars.githubusercontent.com/u/109473586?v=4" className=' rounded-full' alt='avater-img' height={50} width={50}/>
            </div>
        </div>
        <textarea className=' w-full col-span-11   text-2xl pt-2 bg-transparent outline-none' placeholder='What is happening?!' rows={4}/>


    </div>
    <div className=" flex   px-6 my-3   items-center justify-between">
        <AiOutlinePicture onClick={handleSelectImage} className=' text-2xl    ml-11 text-blue-500 cursor-pointer'/>
        <button className="bg-[#1D9BF0]  px-6 py-3 text-[20px] rounded-full mt-2   opacity-40 font-bold">Post</button>

    </div>
    </div>
}
export default CreatePost;