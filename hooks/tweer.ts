import { graphqlClient } from "@/clients/api"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {CreateTweetData} from "@/gql/graphql"
import toast from "react-hot-toast"
export const useCreateTweets = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:(payload:CreateTweetData)=>graphqlClient.request(createTweetMutation,{payload}),
        onMutate:()=> toast.loading("Posting Your Tweet",{id:"1"}),
        onSuccess:async ()=>{
             queryClient.invalidateQueries({queryKey:["all-tweets"]})
             toast.success("Created Post ",{id:"1"})
            
            }
    });
    return mutation;
}

export const useGetAllTweets = ()=>{
    const query = useQuery({
        queryKey:['all-tweets'],
        queryFn:()=> graphqlClient.request(getAllTweetsQuery)
    })
    return {...query, tweets: query.data?.getAllTweets}
}