import { getStorage, ref, uploadString,getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import 'react-native-get-random-values'
import { storage } from '../../configs/firebaseConfig';



export class FireStore{
    //allow component to create the image name
    //required for the Profile Object
    //make these methods loosely coupled to the component

    readonly uriToBlob = async (uri:string) => {
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

    uploadImage = async ({uri,imageName}:{uri: string, imageName: string}) => {
        const storageRef = ref(storage,imageName);

        const blobz = await this.uriToBlob(uri) as Blob;

        return await uploadBytes(storageRef, blobz)

        
    }
    
    downloadImage = async ({imageName}:{imageName: string}) => {
        const storageRef = ref(storage, imageName);
        return await getDownloadURL(storageRef);
    }
}