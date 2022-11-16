
import React, {createContext, useState, useContext, useEffect} from 'react'
import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore"

import UserContext from './AuthContext';


const UsuarioContext = createContext()  
export default UsuarioContext;


export const UsuarioContextProvider = ({children}) => {
    const {user} = useContext(UserContext)
    const [Usuario, setUsuario]= useState({})
console.log('hay usuario?: ', user)

    const accessKey = async()=>{
      const db=getFirestore();
        const queryDoc = doc(db, "users", user.uid)
        await getDoc(queryDoc).then(res=>{
           
            setUsuario(res.data())
        })
    }

    React.useEffect(()=>{
      accessKey()


    }
        ,[user]) 

console.log('Usuario:', Usuario)

  return (
    <UsuarioContext.Provider value={{
Usuario

    }}>

        {children}
    </UsuarioContext.Provider>
  )
}
