import React from 'react'
import Image from 'next/image'
import { CiHeart } from 'react-icons/ci';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FiMessageCircle } from 'react-icons/fi';
import { FaRetweet } from 'react-icons/fa6';
const FeedCard: React.FC =()=>{
    return <div  className='grid grid-cols-12 border border-gray-800 p-4 cursor-pointer'>
        <div className=" col-span-1">
            <div className="">
            <Image src="https://avatars.githubusercontent.com/u/109473586?v=4" className=' rounded-full' alt='avater-img' height={50} width={50}/>
            </div>
        </div>
        <div className="col-span-11">
            <h3 className=' font-bold text-[20px] justify-start'>Harshit chopde</h3>
            <p>
            🚀 Exciting News! 🚀
             I'm thrilled to share that I have successfully completed the NPTEL 
             Introduction to Java course with an outstanding score of 86%! 🌟💻
            #Java #Programming #NPTEL #LearningJourney 
            #AchievementUnlocked #ContinuousLearning #JavaProgramming
            </p>
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