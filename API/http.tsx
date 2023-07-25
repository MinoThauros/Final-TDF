import axios, { AxiosError, AxiosResponse } from 'axios'
import { spending } from '../models/spending';
import {AuthRequestPayloadArgs,SignUpResponsePayload,SignInResponsePayload} from './httpUtils'
import { FIREBASE_API_KEY } from 'react-native-dotenv';
import { Profile } from '../models/profile';
import { FireStore } from './Firebase/CloudStorage';
import { store } from '../states/redux/store';
import { Alert } from 'react-native';
import { err } from 'react-native-svg/lib/typescript/xml';

export type ProfilePhotoUploadResponse={
    response:any,
    message:'Success' | 'Error'
}


export class HTTPInterface{
    readonly rootApi:string='https://bgetapp-default-rtdb.firebaseio.com/';
    readonly expenseNode:string='expenses.json';
    readonly url:string='https://bgetapp-default-rtdb.firebaseio.com/expenses.json';

    async storeExpense({spending,userId} :{spending:spending,userId:string}){
        //store photo to cloud storage here
        const response=await axios.post(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses.json`,spending)
        return response.data.name;
    };
    async getExpenses({userId}:{userId:string}){
        const expenses=[] as spending[]

        const response =await axios.get(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses.json`);
        return new Promise((resolve,reject)=>{
            if(response.status===200){
                const {data}=response
                for ( let key in data){
                    const expenseObj:spending={
                        id:key,//firebase id
                        price:data[key].price,
                        date:data[key].date,
                        category:data[key].category,
                        title:data[key].title
                    };
                    expenses.push(expenseObj);
                }

                resolve(expenses as spending[])
            }else{
                reject(response as  AxiosResponse<any, any>)
            }
        })
    
    };

    async deleteExpense({userId,id} :{userId:string,id:string}) {
        console.log('deleting expense...', id,'from user',userId)
        return await axios.delete(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses/${id}.json`)
        
    }

    async updateExpense({id,updatedExpense, userId}:{id:string,updatedExpense:spending, userId:string}){
        return await axios.put(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses/${id}.json`,updatedExpense)
    }

    getBudget=async ({userId}:{userId:string})=>{
        return await axios.get(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/budget.json`)
    }

    updateBudget=async ({newBudget,userId}:{newBudget:any,userId:string})=>{
        return await axios.put(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/budget.json`,newBudget)
    }

    createBudget=async ({newBudget,userId}:{newBudget:any,userId:string})=>{
        return await axios.post(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/budget.json`,newBudget)
    }
}

export class AuthInterface{
    private readonly  API_KEY:string=FIREBASE_API_KEY;
    private readonly  generateUrl=({mode}:{mode:'signInWithPassword'|'signUp'})=>{
        return `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${this.API_KEY}`

    }
    login=async ({email,password}:{email:string,password:string}):Promise<AxiosResponse<SignInResponsePayload, AxiosError>> =>{

        return await axios.post(this.generateUrl({mode: 'signInWithPassword'}),{
            email,
            password,
            returnSecureToken:true
            //ask backend to return token; if token is returned, we know that the login was successful
            }as AuthRequestPayloadArgs)
    }

    signup=async ({email,password}:{email:string,password:string})=>{
        return await axios.post(this.generateUrl({mode:'signUp'}),{
            email,
            password,
            returnSecureToken:true
            //ask backend to return token; if token is returned, we know that the login was successful
            }as AuthRequestPayloadArgs)
            
    }

}

type GetProfileResponse={
    response:Profile|AxiosResponse<any,any> | null,
    message:'No Profile found' | 'Found profile' | 'error'
}

const {uploadImage,downloadImage}=new FireStore();
export class ProfileInterface{

    getProfile=async ({userId}:{userId:string}):Promise<GetProfileResponse> =>{
        let profile=[] as Profile[]

        const response =await axios.get(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json`);
        return new Promise((resolve,reject)=>{
            if(response.status===200 && response){
                const {data}=response
                const profileObj:Profile={
                    id:'',//firebase id
                    name:data.name,
                    last_name:data.last_name,
                    date_of_birth:data.date_of_birth,
                    city:data.city,
                    country:data.country,
                    gender:data.gender,
                    occupation:data.occupation,
                    imageUrl:data.imageUrl??'',//if no image url, set to empty string
                };


                if(profileObj){
                    //resolve(profile[0] as Profile)
                    resolve({
                        response: profileObj,
                        message: 'Found profile'
                    })
                    
                }
            }if(profile.length===0 && response.status===200){
                resolve({
                    response: null,
                    message:'No Profile found'
                
                })
            }else{
                reject({
                    response: response as  AxiosResponse<any, any>,
                    message:'Error'
                })
            }
        })
    }

    updateProfile=async ({userId,newProfile}:{userId:string,newProfile:Profile})=>{
        return await axios.put(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json`,newProfile)
    }

    createProfile=async ({userId,profile}:{userId:string,profile:Profile})=>{
        return await axios.post(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json`,profile)
    }

    updateProfilePhoto=async ({userId,newProfile}:{userId:string,newProfile:Profile}):Promise<ProfilePhotoUploadResponse>=>{
        let error:any
        let storedImageUrl:any
        const imageName=`profile/${userId}`
        let updatedProfile:any

        try{
            storedImageUrl=await uploadImage({
                uri:newProfile.imageUrl??'',
                imageName
            })
            updatedProfile=await this.updateProfile({
                userId,
                newProfile
            })

        }catch(err){
            Alert.alert('Error',err as any)
            error=err
        }
        
        return new Promise((resolve,reject)=>{
            if(error){
                reject({
                        message:'Error',
                        response:error
                    })
            }
            resolve({
                    message:'Success',
                    response:updatedProfile
                })
        })
    }

    getProfileAndPhoto=async ({userId}:{userId:string}):Promise<ProfilePhotoUploadResponse>=>{
        let profileResponse:any
        let profile:any
        let imageUrl :any
        let error:any=null
        try{
            profileResponse=await this.getProfile({userId})
            profile=profileResponse.response as Profile
            imageUrl=await downloadImage({imageName:`profile/${userId}`})
        }catch(e){
            Alert.alert('Error',e as any)
            error=e
        }

        return new Promise((resolve,reject)=>{
            if(error){
                reject({
                    response:error,
                    message:'Error'
                })
            }
            resolve({
                response:{
                    ...profile,
                    imageUrl
                } as Profile,
                message:'Success'
            })
        })
    }
}