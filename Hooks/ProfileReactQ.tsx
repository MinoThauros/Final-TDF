import { useMutation, useQuery } from "@tanstack/react-query"
import { ProfileInterface } from "../API/http";
import { Profile } from "../models/profile";
import { QueryClient } from "@tanstack/react-query";

const {getProfile,createProfile,updateProfile}=new ProfileInterface();

const queryClient=new QueryClient();

export const useGetProfile = ({userId}:{userId:string}) => {
    return useQuery({
        queryKey:['profile',userId],
        queryFn:()=>getProfile({userId}),
    })
}

export const useCreateProfile = ({userId}:{userId:string}) => {
    return useMutation({
        mutationKey:['profile',userId],
        mutationFn:createProfile,
        onSuccess:()=>console.log('profile created'),
        onMutate: async ({ userId, profile }:{userId:string,profile:Profile})=>{

        },
        onError:(err,variables,contect)=>{

        },
        onSettled:()=>{
            queryClient.invalidateQueries({ queryKey: ['profile',userId] })

        },
    })
}

export const useUpdateProfile = ({userId,profile}:{userId:string,profile:Profile}) => {
    return useMutation({
        mutationKey:['profile',userId],
        mutationFn:()=>updateProfile({userId,newProfile:profile}),
        onSuccess:()=>console.log('profile updated'),
        onMutate: async ({ userId, profile }:{userId:string,profile:Profile})=>{

        },
        onError:(err,variables,contect)=>{

        },
        onSettled:()=>{
            queryClient.invalidateQueries({ queryKey: ['profile',userId] })
        },
    })
}