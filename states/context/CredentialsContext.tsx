import { createContext, useState } from "react";

export const AuthContext=createContext({
    token:null as string | null,
    logout:():void=>{},//to set the token to null
    userId:'' as string,
    isAuthenticated:false as boolean,
    authenticate:({token,userId}:{token:string,userId:string}):void=>{},//to set the token to a value
})

export const AuthContextProvider=({children}:any):JSX.Element=>{
    const [token,setToken]=useState(null as string | null);
    const [isAuthenticated,setIsAuthenticated]=useState(false as boolean);
    const [userId,setUserId]=useState('' as string);

    const Logout=():void=>{
        setToken(null);
        setIsAuthenticated(false)//!!converts to boolean
        setUserId('');
    }

    const Authenticate=({token,userId}:{token:string,userId:string}):void=>{
        setToken(token);
        setIsAuthenticated(!!token)
        setUserId(userId);

    }

    const context={
        token,
        isAuthenticated,
        logout:Logout,
        authenticate:Authenticate,
        userId,
    }
    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}