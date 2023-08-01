import { getStorage, ref, uploadString,getDownloadURL, uploadBytes } from "firebase/storage";
import 'react-native-get-random-values'
import { storage } from '../../configs/firebaseConfig';

type APIResponse = {
  response:any,
  message:'Success' | 'Error'
}

export class FireStore{
    //allow component to create the image name
    //required for the Profile Object
    //make these methods loosely coupled to the component

    private readonly uriToBlob = async (uri:string) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        return blob;
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