import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { ProfileInterface } from "../API/http";
import { Profile } from "../models/profile";
const {createProfile,getProfileAndPhoto, updateProfilePhoto}=new ProfileInterface();



export const useGetProfile = ({userId}:{userId:string}) => {
    return useQuery({
        queryKey:['profile'],
        queryFn:()=>getProfileAndPhoto({userId}),
        onSuccess:({response})=>{console.log('Success',response.data)}
    })
}

export const useCreateProfile = ({queryClient}:{queryClient:QueryClient}) => {
    return useMutation({
        mutationKey:['profile'],
        mutationFn:createProfile,
        onMutate: async ({ userId, profile }:{userId:string,profile:Profile})=>{
            await queryClient.cancelQueries({ queryKey: ['profile'] })
            const previousProfile = queryClient.getQueryData(['profile']) as Profile;
            queryClient.setQueryData(['profile'], (old:any) => profile as Profile);
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
        mutationFn:updateProfilePhoto,
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

export const useUpdateProfilePhoto = ({queryClient}:{queryClient:QueryClient}) => {
    return useMutation({
        mutationKey:['profile'],
        mutationFn:updateProfilePhoto,
        onMutate: async ({ userId, newProfile }:{userId:string,newProfile:Profile})=>{
            await queryClient.cancelQueries({ queryKey: ['profile'] })
            const previousProfile = queryClient.getQueryData(['profile']) as Profile;
            queryClient.setQueryData(['profile'], (old:any) => {
                return {
                    ...old,
                    imageUrl:newProfile.imageUrl??''
                } as Profile
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


