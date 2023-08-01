import { useMutation, useQuery } from "@tanstack/react-query"
import { FireStore } from "../API/Firebase/CloudStorage"
import { ProfilePhotoInterface } from "../API/Firebase/ProfilePhoto"

const {downloadProfilePhoto,uploadProfilePhoto}=new ProfilePhotoInterface();

export const useGetProfilePicture = ({ userId }: { userId: string }) => {
    return useQuery({
        queryKey: ['profile/photo'],
        queryFn: () => downloadProfilePhoto({ userId }),
        enabled:!!userId
    })
}

export const usePutProfilePhoto=({queryClient}:{queryClient:any})=>{
    return useMutation({
        mutationKey:['profile/photo'],
        mutationFn:uploadProfilePhoto,
        onMutate: async ({uri}:{uri: string,userId:string})=>{
            await queryClient.cancelQueries({ queryKey: ['profile/photo'] })
            const previousPhoto = queryClient.getQueryData(['profile/photo']) as string;
            queryClient.setQueryData(['profile/photo'], (old:any) => uri as string);
            return { previousPhoto };
        },
        onError:(err,variables,context)=>{
            queryClient.setQueryData(['profile/photo'], context?.previousPhoto as string)
        },
        onSettled:()=>{
            queryClient.invalidateQueries({ queryKey: ['profile/photo'] })
        },
    })
}