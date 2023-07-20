import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import { storage } from '../../../configs/firebaseConfig';
import { ImageURISource } from "react-native";

export class FireStore{
    //allow component to create the image name
    //required for the Profile Object
    //make these methods loosely coupled to the component

    readonly storage = getStorage();

    uploadImage = async ({uri,imageName}:{uri: any, imageName: string}) => {

        const storageRef = ref(this.storage, imageName);

        return await uploadString(storageRef, uri)
    }
    
    downloadImage = async ({imageName}:{imageName: string}) => {
        const storageRef = ref(this.storage, imageName);
        return await getDownloadURL(storageRef);
    }
}