// "use client"
import FeedCard from "@/components/FeedCards";
import CreatePost from "@/components/CreatePost";
import { useGetAllTweets } from "@/hooks/tweer";
import { Tweet } from "@/gql/graphql";
import TweeterLayout from "@/components/Layouts/TweeterLayout";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

interface ServerPropsTweets{
  tweets?: Tweet[]
}

export default function Home(props:ServerPropsTweets) {

    // const { tweets } = props
    const {tweets = props.tweets} = useGetAllTweets();

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
export const getServerSideProps:GetServerSideProps<ServerPropsTweets> =async(context)=>{
  const tweets = await graphqlClient.request(getAllTweetsQuery);
 

  return {
    props:{
        tweets:tweets.getAllTweets as Tweet[],
    }
  }
}
