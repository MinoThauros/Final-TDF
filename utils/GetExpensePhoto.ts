import { FIREBASE_API_KEY } from "react-native-dotenv"
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Alert } from "react-native"

const getPhoto = async ({ height, width, photo_reference }: any) => {
    try {
      const resp = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&maxheight=${height}&photo_reference=${photo_reference}&key=${FIREBASE_API_KEY}`);
      return resp;
    } catch (error) {
        throw error;
    }
  };
export const getExpensePhoto = async ({details}:{details:any})=> {
    //get photoreference from GooglePlaceAutoComplete
    const {height,width, photo_reference}=details.photos[0]
    let resp: null | AxiosResponse<any>= null
    try{
        resp=await getPhoto({height,width, photo_reference})
    }catch(e:any){
        Alert.alert('Error',e.message)
    }
    return new Promise((resolve,reject)=>{
        if(resp){
            resolve(resp.request.responseURL)
        }else{
            reject('Error: AxiosResponse is null')
        }
    })

}
