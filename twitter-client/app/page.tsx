"use client"
import FeedCard from "@/components/FeedCards";
import CreatePost from "@/components/CreatePost";
import { useGetAllTweets } from "@/hooks/tweer";
import { Tweet } from "@/gql/graphql";
import TweeterLayout from "@/components/Layouts/TweeterLayout";

export default function Home() {
  
  const { tweets } = useGetAllTweets();

  // console.log(user+"d")



  return (
    <div>
       <TweeterLayout>
       <CreatePost />
    
        {
          tweets?.map(tweets => <FeedCard key={tweets?.id} data={tweets as Tweet} />)
        }
       </TweeterLayout>
    </div>
  );
}
