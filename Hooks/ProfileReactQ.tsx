import { useMutation, useQuery } from "@tanstack/react-query"
import { ProfileInterface } from "../API/http";
import { Profile } from "../models/profile";

const {getProfile,createProfile,updateProfile}=new ProfileInterface();

export const useGetProfile = ({userId}:{userId:string}) => {
    return useQuery({
        queryKey:['profile',userId],
        queryFn:()=>getProfile({userId}),
    })
}

export const useCreateProfile = ({userId,profile}:{userId:string,profile:Profile}) => {
    return useMutation({
        mutationKey:['profile',userId],
        mutationFn:()=>createProfile({userId,profile}),
        onSuccess:()=>console.log('profile created'),
        onMutate: async ({ userId, profile }:{userId:string,profile:Profile})=>{

        },
        onError:(err,variables,contect)=>{

        },
        onSettled:()=>{

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
            
        },
    })
}