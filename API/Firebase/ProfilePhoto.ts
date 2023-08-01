import { FireStore } from "./CloudStorage";

const {downloadImage,uploadImage}=new FireStore();

/**
 * @description a simple abstraction of the firestore class to handle profile photo uploads
 */
export class ProfilePhotoInterface{
    uploadProfilePhoto = async ({uri,userId}:{uri: string,userId:string}) => {
        return uploadImage({uri:uri,imageName:`profile/${userId}`})
    }

    downloadProfilePhoto = async ({userId}:{userId: string}) => {
        return downloadImage({imageName:`profile/${userId}`})
    }
}