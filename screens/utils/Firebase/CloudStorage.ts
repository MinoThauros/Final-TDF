import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values'
import { storage } from '../../../configs/firebaseConfig';

export class FireStore{
    //allow component to create the image name
    //required for the Profile Object
    //make these methods loosely coupled to the component

    uploadImage = async ({uri,imageName}:{uri: any, imageName: string}) => {

        const storageRef = ref(storage, imageName);

        return await uploadString(storageRef, uri)
    }
    
    downloadImage = async ({imageName}:{imageName: string}) => {
        const storageRef = ref(storage, imageName);
        return await getDownloadURL(storageRef);
    }
}