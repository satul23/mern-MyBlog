import { createContext } from "react";
import { useState } from "react";

export const Usercontext = createContext({});


export function UserContextProvider({children}){

 const[userInfo,setUserInfo] = useState({})

    return(
        <Usercontext.Provider  value={{userInfo,setUserInfo}}>
            {children}
        </Usercontext.Provider>
    )
};