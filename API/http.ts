import axios, { AxiosError, AxiosResponse } from 'axios'
import { spending } from '../models/spending';
import {AuthRequestPayloadArgs,SignUpResponsePayload,SignInResponsePayload} from './httpUtils'
import { Profile } from '../models/profile';
import { APIResponse } from './Firebase/CloudStorage';

export type ProfilePhotoUploadResponse={
    response:any,
    message:'Success' | 'Error'
}


export class HTTPInterface{
    readonly rootApi:string=process.env.EXPO_PUBLIC_DATABASE_URL as string;
    readonly expenseNode:string='expenses.json';
    readonly url:string='https://bgetapp-default-rtdb.firebaseio.com/expenses.json';

    async storeExpense({spending,userId, IdToken} :{spending:spending,userId:string,IdToken:string}){
        //store photo to cloud storage here
        const response=await axios.post(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses.json?auth=${IdToken}`,spending)
        return response.data.name;
    };
    async getExpenses({userId,IdToken}:{userId:string,IdToken:string}){
        const expenses=[] as spending[]
        let resp:APIResponse

        try{
            const response =await axios.get(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses.json?auth=${IdToken}`);
            resp={
                response:response,
                message:'Success'
            }
        }catch(err){
            resp={
                response:err,
                message:'Error'
            }
        }

        
        return new Promise((resolve,reject)=>{
            if(resp.response.status===200 || resp.message==='Success'){
                const {data}=resp.response
                for ( let key in data){
                    const expenseObj:spending={
                        id:key,//firebase id
                        price:data[key].price,
                        date:data[key].date,
                        category:data[key].category,
                        title:data[key].title,
                        imageUrl:data[key].imageUrl,
                    };
                    expenses.push(expenseObj);
                }

                resolve(expenses as spending[])
            }else{
                reject(resp.response as AxiosResponse<any,any>)
            }
        })
    
    };

    async deleteExpense({userId,id,IdToken} :{userId:string,id:string,IdToken:string}) {
        return await axios.delete(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses/${id}.json?auth=${IdToken}`)
        
    }

    async updateExpense({id,updatedExpense, userId, IdToken}:{id:string,updatedExpense:spending, userId:string, IdToken:string}){
        return await axios.put(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/expenses/${id}.json?auth=${IdToken}`,updatedExpense)
    }
}

export class AuthInterface{
    private readonly  API_KEY:string=process.env.EXPO_PUBLIC_FIREBASE_API_KEY as string;
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

export class ProfileInterface{

    getProfile=async ({userId,IdToken}:{userId:string,IdToken:string}):Promise<GetProfileResponse> =>{
        let profile=[] as Profile[]

        const response =await axios.get(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json?auth=${IdToken}`);
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
                    occupation:data.occupation
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

    updateProfile=async ({userId,newProfile,IdToken}:{userId:string,newProfile:Profile,IdToken:string})=>{
        return await axios.put(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json?auth=${IdToken}`,newProfile)
    }

    createProfile=async ({userId,profile,IdToken}:{userId:string,profile:Profile,IdToken:string})=>{
        return await axios.post(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json?auth=${IdToken}`,profile)
    }
}