import React, {createContext, useState, useContext, useEffect} from 'react'
import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot} from "firebase/firestore"
import { auth } from '../../firebase-config';


const RegistroContext = createContext()  
export default RegistroContext;

export const RegistroProvider = ({children}) => {
  const dato= auth.currentUser;
    
    const [registro, setRegistro] = useState([])
    const [usuarioAsistencia, setUsuarioAsistencia] =useState([])
    const [tipoAsistencia, setTipoAsistencia] = useState()
    const [postReg, setPostReg] = useState()
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
  

        console.log('are you undefined?', postReg)

/* 
        const putAsistencia = async() =>{

          const q = query(collection(querydb, "asignaciones"),where("residenteUid", "==", dato.uid ))
        }


 */


    return (
        <RegistroContext.Provider value={ { registro, setRegistro, usuarioAsistencia, setUsuarioAsistencia, tipoAsistencia, setTipoAsistencia, setPostReg, postReg}   }>
        {children}
        </RegistroContext.Provider>
  )
}
