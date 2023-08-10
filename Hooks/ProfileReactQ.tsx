import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { ProfileInterface } from "../API/http";
import { Profile } from "../models/profile";
const {createProfile,getProfile, updateProfile}=new ProfileInterface();



export const useGetProfile = ({userId}:{userId:string}) => {
    return useQuery({
        queryKey:['profile'],
        queryFn:()=>getProfile({userId}),
    })
}

export const useCreateProfile = ({queryClient}:{queryClient:QueryClient}) => {
    return useMutation({
        mutationKey:['profile'],
        mutationFn:createProfile,
        onMutate: async ({ userId, profile }:{userId:string,profile:Profile})=>{
            //cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['profile'] })

            //snapshot the previous value
            const previousProfile = queryClient.getQueryData(['profile']) as Profile;

            //optimistically update to the new value
            queryClient.setQueryData(['profile'], (old:any) => profile as Profile);

            //return a context object with the snapshotted value
            return { previousProfile };

        },
        onError:(err,variables,context)=>{
            //rollback to the previous value
            queryClient.setQueryData(['profile'], context?.previousProfile as Profile)
        },
        onSettled:()=>{
            //refresh the entire cache
            queryClient.invalidateQueries({ queryKey: ['profile'] })

        },
        
    })
}

export const useUpdateProfile = ({queryClient}:{queryClient:QueryClient}) => {
    return useMutation({
        mutationKey:['profile'],
        mutationFn:updateProfile,
        onMutate: async ({ userId, newProfile }:{userId:string,newProfile:Profile})=>{
            await queryClient.cancelQueries({ queryKey: ['profile'] })
            const previousProfile = queryClient.getQueryData(['profile']) as Profile;
            queryClient.setQueryData(['profile'], (old:any) => {
                return {
                    ...old,
                    ...newProfile
                }
            });
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


