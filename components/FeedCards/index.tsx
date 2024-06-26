import React from 'react'
import Image from 'next/image'
import { CiHeart } from 'react-icons/ci';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FiMessageCircle } from 'react-icons/fi';
import { FaRetweet } from 'react-icons/fa6';
import { Tweet } from '@/gql/graphql';
import Link from 'next/link';

interface FeedCardProbs{
    data: Tweet
}
const FeedCard: React.FC<FeedCardProbs> =(props)=>{
    const {data} = props
    return <div  className='grid   grid-cols-12 border border-gray-800 p-4 cursor-pointer'>
        <div className=" col-span-1">
            <div className="">
            {data.author.profilePic && <Image src={data.author.profilePic} className=' rounded-full' alt='avater-img' height={50} width={50}/>}
            </div>
        </div>
        <div className="col-span-11">
            <Link href={`${data.author.id}`} className=' font-bold text-[20px] justify-start'>{data.author.firstName}</Link>
            <p>
            {data.content}
            </p>
            {
                data.imageURL && <Image className="my-4" src={data.imageURL} alt='Not found!'  width={600} height={300}/>
            }
            <div className=" flex text-2xl justify-between pr-12 pt-5">
                <div className='   hover:bg-[#172554]  hover:bg-opacity-50 hover:text-blue-500 rounded-full p-1'>
                    <FiMessageCircle/>

                </div>
                <div className='   hover:bg-[#14532d] hover:bg-opacity-50 hover:text-green-500 rounded-full p-1'>
                    <FaRetweet/>
                    
                </div>
                <div className='   hover:bg-[#831843] hover:bg-opacity-50 hover:text-pink-500 rounded-full p-1'>
                    <CiHeart/>
                    
                </div>
                <div className='   hover:bg-[#172554] hover:bg-opacity-50 hover:text-blue-500 rounded-full p-1'>
                    <MdOutlineFileUpload/>
                    
                </div>
            </div>
        </div>
    </div>
}
export default FeedCard;