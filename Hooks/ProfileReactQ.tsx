import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { ProfileInterface } from "../API/http";
import { Profile } from "../models/profile";
import { useQueryClient } from "@tanstack/react-query";

const {getProfile,createProfile,updateProfile}=new ProfileInterface();



export const useGetProfile = ({userId}:{userId:string}) => {
    return useQuery({
        queryKey:['profile'],
        queryFn:()=>getProfile({userId}),
        onSuccess:(data)=>console.log('profile fetched',data,'userID: ',userId),
    })
}

export const useCreateProfile = ({queryClient}:{queryClient:QueryClient}) => {
    return useMutation({
        mutationKey:['profile'],
        mutationFn:createProfile,
        onSuccess:()=>console.log('profile created'),
        onMutate: async ({ userId, profile }:{userId:string,profile:Profile})=>{
            await queryClient.cancelQueries({ queryKey: ['profile'] })
            const previousProfile = queryClient.getQueryData(['profile']) as Profile;
            queryClient.setQueryData(['profile'], (old:any) => profile as Profile);
            console.log('query data is updated to',queryClient.getQueryData(['profile']))
            return { previousProfile };

        },
        onError:(err,variables,context)=>{
            queryClient.setQueryData(['profile'], context?.previousProfile as Profile)

        },
        onSettled:()=>{
            queryClient.invalidateQueries({ queryKey: ['profile'] })

        },
    })
}

export const useUpdateProfile = ({queryClient}:{queryClient:QueryClient}) => {
    return useMutation({
        mutationKey:['profile'],
        mutationFn:updateProfile,
        onSuccess:({data})=>console.log('profile updated',data),
        onMutate: async ({ userId, newProfile }:{userId:string,newProfile:Profile})=>{
            await queryClient.cancelQueries({ queryKey: ['profile'] })
            const previousProfile = queryClient.getQueryData(['profile']) as Profile;
            queryClient.setQueryData(['profile'], (old:any) => newProfile as Profile);

            console.log('query data is updated to',queryClient.getQueryData(['profile']))
            return { previousProfile };

        },
        onError:(err,variables,context)=>{
            console.log(err)
            queryClient.setQueryData(['profile'], context?.previousProfile as Profile)

        },
        onSettled:()=>{
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
    })
}