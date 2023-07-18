import axios, { AxiosError, AxiosResponse } from 'axios'
import { spending } from '../models/spending';
import {AuthRequestPayloadArgs,SignUpResponsePayload,SignInResponsePayload} from './httpUtils'
import { FIREBASE_API_KEY } from 'react-native-dotenv';
import { Profile } from '../models/profile';

/*
Firebase rules have to be:

{
  "rules": {
    ".read": true,
    ".write": true,
  }
}

*/

export class HTTPInterface{
    readonly rootApi:string='https://bgetapp-default-rtdb.firebaseio.com/';
    readonly expenseNode:string='expenses.json';
    readonly url:string='https://bgetapp-default-rtdb.firebaseio.com/expenses.json';

    async storeExpense(spending:spending){
        const response=await axios.post('https://bgetapp-default-rtdb.firebaseio.com/expenses.json',spending)
        return response.data.name;
    };
    async getExpenses(){
        const expenses=[] as spending[]

        const response =await axios.get('https://bgetapp-default-rtdb.firebaseio.com/expenses.json');
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

    async deleteExpense(id:string) {
        return await axios.delete('https://bgetapp-default-rtdb.firebaseio.com/expenses'+`/${id}.json`)
        
    }

    async updateExpense({id,updatedExpense}:{id:string,updatedExpense:spending}){
        return await axios.put('https://bgetapp-default-rtdb.firebaseio.com/expenses'+`/${id}.json`,updatedExpense)
    }

    getBudget=async ()=>{
        try{
            const response=await axios.get('https://bgetapp-default-rtdb.firebaseio.com/budget.json')
            return response
        }catch(err){
            console.log(err)
            return err
        }
    }

    updateBudget=async (newBudget:spending)=>{
        try{
            const response=await axios.put('https://bgetapp-default-rtdb.firebaseio.com/budget.json',newBudget)
            return response
        }catch(err){
            console.log(err)
            return err
        }

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

export class ProfileInterface{

    getProfile=async ({userId}:{userId:string})=>{
        let profile=[] as Profile[]

        const response =await axios.get(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json`);
        return new Promise((resolve,reject)=>{
            if(response.status===200){
                const {data}=response
                for ( let key in data){
                    const profileObj:Profile={
                        id:key,//firebase id
                        name:data[key].name,
                        last_name:data[key].last_name,
                        date_of_birth:data[key].date_of_birth,
                        city:data[key].city,
                        country:data[key].country,
                        gender:data[key].gender,
                        occupation:data[key].occupation,
                        imageUrl:data[key].imageUrl??'',//if no image url, set to empty string
                    };
                    profile.push(profileObj);
                }

                resolve(profile[0] as Profile)
            }else{
                reject(response as  AxiosResponse<any, any>)
            }
        })
    }

    updateProfile=async ({userId,newProfile}:{userId:string,newProfile:Profile})=>{
        return await axios.put('https://bgetapp-default-rtdb.firebaseio.com/profile'+`/${userId}.json`,newProfile)
    }

    createProfile=async ({userId,profile}:{userId:string,profile:Profile})=>{
        return await axios.post(`https://bgetapp-default-rtdb.firebaseio.com/${userId}/profile.json`,profile)
    }
}