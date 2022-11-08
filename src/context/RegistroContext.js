import React, {createContext, useState, useContext, useEffect} from 'react'
import { getFirestore, update, FieldValue, get, query, where, collection, getDoc, onSnapshot, doc, updateDoc, arrayUnion} from "firebase/firestore"
import AsignacionContext from './AsignacionContext';

const RegistroContext = createContext()  
export default RegistroContext;

export const RegistroProvider = ({children}) => {
 // const {uidAsignacion} = useContext(AsignacionContext)

    
    const [registro, setRegistro] = useState([])
    const [usuarioAsistencia, setUsuarioAsistencia] =useState([])
    const [tipoAsistencia, setTipoAsistencia] = useState()

  
    const querydb=getFirestore();
  

        const fetchUser = async () => {  
         const ref = doc(querydb, "users", usuarioAsistencia)
         const docSnap = await getDoc(ref)
         const Usuario = []
        if(docSnap.exists()) {
          const user = docSnap.data()
           console.log("fetch user",user.toString())
            Usuario.push(user)
            
        }else{ 
          console.log("No such document!")
        }
        setRegistro(Usuario)
        

      }


        useEffect(()=>{
            
 
            fetchUser()

            
        },[usuarioAsistencia])
  





    return (
        <RegistroContext.Provider value={ { registro, setRegistro, usuarioAsistencia, setUsuarioAsistencia, tipoAsistencia, setTipoAsistencia}   }>
        {children}
        </RegistroContext.Provider>
  )
}
