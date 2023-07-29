//login and signup hooks to be used in the login and signup components
//use setQuery hook regardless
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthInterface } from '../API/http';
import { SignInResponsePayload, SignUpResponsePayload } from '../API/httpUtils';
import {format as prettyFormat} from 'pretty-format';


//CUD action so either we post a new item
export type useMutationProps = {
    onSuccess: ({idToken,userId}:{idToken:string,userId:string}) => void;
    onError?: ({response}:{response:any}) => void;
}

const {login,signup}= new AuthInterface();

export const useLogin = ({onSuccess,onError}:useMutationProps) => {
    return useMutation(['login'], login,{
        onSuccess:({data})=>{
            onSuccess({
                idToken:data.idToken,
                userId:data.localId,
            })},
        onError:onError
})}

export const useSignup = ({onSuccess}:{onSuccess: ({idToken,userId}:{idToken:string,userId:string}) => void}) => {
    return useMutation(['signup'], signup,{
        onSuccess:({data})=>onSuccess({
            idToken:data.idToken,
            userId:data.localId,
        }),
        //axios returns a .response prop when there is an error
        //there is no data on error, only response
        onError:({response})=>console.log(response.data.error.message,response.data.error.code),
    })
}