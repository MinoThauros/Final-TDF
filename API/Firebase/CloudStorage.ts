import { getStorage, ref, uploadString,getDownloadURL, uploadBytes } from "firebase/storage";
import 'react-native-get-random-values'
import { storage } from '../../configs/firebaseConfig';

export type APIResponse = {
  response:any,
  message:'Success' | 'Error'
}

/**
 * @classdesc This class is used to handle all the cloud storage related operations
 * @method uploadImage(photoProps) - Uploads an image to the cloud storage
 * @method downloadImage(imageName) - Downloads an image from the cloud storage
 */
export class FireStore{
  //this method is problematic and most likely causes crashes
    private readonly uriToBlob = async (uri:string) => {
      const fetchResponse = await fetch(uri);
      return await fetchResponse.blob();
      };

    uploadImage = async ({uri,imageName}:{uri: string, imageName: string}):Promise<APIResponse> => {
        const storageRef = ref(storage,imageName);
        let response :APIResponse
        //create a proper promise to be handed to RQ for dedicated profile/photo cache
        //this would be handled by the backend where the backend would return the image url from
        //-the storage bucket as a profile prop
        
        try{
          const blobz = await this.uriToBlob(uri) as Blob;
          const uploadResponse= await uploadBytes(storageRef, blobz)
          response = {
            response: uploadResponse.ref.fullPath as string,
            message: 'Success'
          }
        }catch(err){
          response = {
            response: err,
            message: 'Error'
          }
        }
        return new Promise((resolve,reject) => {
          if(response.message === 'Success'){
            resolve(response)
          }else{
            reject(response)
          }
        })

        
        

        
    }
    
    downloadImage = async ({imageName}:{imageName: string}):Promise<APIResponse> => {
        const storageRef = ref(storage, imageName);
        let response :APIResponse
        try{
          const downloadUrl= await getDownloadURL(storageRef);
          response = {
            response: downloadUrl,
            message: 'Success'
          }
        }catch(err){
          console.log(err)
          response = {
            response: err,
            message: 'Error'
          }
        }
        return new Promise((resolve,reject) => {
          if(response.message === 'Success'){
            resolve(response)
          }else{
            reject(response)
          }
        })
    }


}