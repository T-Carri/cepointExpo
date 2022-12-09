import React, {createContext, useState, useContext, useEffect} from 'react'
import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore"
import {  ref, uploadBytes, uploadString } from "firebase/storage";
import { auth, storage } from '../../firebase-config';
import UserContext from './AuthContext';
import RegistroContext from './RegistroContext';
const AsignacionContext = createContext()  
export default AsignacionContext;

 export const AsignacionProvider = ({children}) => {
   const [asignacion, setAsignacion]= useState("test")
   const [currentU, setCurrentU] = useState()
   const [uidAsignacion, setUidAsignacion ] = useState('')
   const [postReg, setPostReg] = useState()
   const {user} = useContext(UserContext)
   //const {registro}=useContext(RegistroContext)
 //  const [usuario, setUsuario] = useState(user.uid)
  // const [actualizado, setActualizado]= useState('')
  /*  const dato= auth.currentUser;
    if (dato!==null){
      console.log( "uid desde checador:", dato.uid )
       //setCurrentU(dato.uid)
    } */



    const getPresupuestos =async () => { 
        const querydb=getFirestore();
        const q = query(collection(querydb, "asignaciones"),where("residenteUid", "==", user.uid ))
        await onSnapshot(q, (query)=>{
          const data=[]
           //const dataid=[]         
          query.forEach((doc)=>{
            data.push(doc.data())
            console.log("UIDD", doc.id)
            setUidAsignacion(doc.id)
          })
          
          setAsignacion(data)
        }) }
    
        useEffect(()=>{
            getPresupuestos()
        },[user])
            

console.log('desde asignacion context:', uidAsignacion )  


const putAsistencia = async() =>{
  const querydb=getFirestore();
  //const q = query(collection(querydb, "asignaciones"),where("residenteUid", "==", dato.uid ))
  const q = doc(querydb, "asignaciones", uidAsignacion);
  await updateDoc( q, {

    asistencias : arrayUnion(postReg )
  }
    
  )
}

/* function uploadFile(file) {
  const storageRef = ref(storage, 'Asistencias')
  uploadString(storageRef, file, 'base64url').then((snapshot)=>{
    console.log('Uploaded a data_url string!')
  })
  
} */


     return (
<AsignacionContext.Provider value={ {
  asignacion, 
  currentU, 
  uidAsignacion, 
  putAsistencia, 
  setPostReg, 
  }   }>
{children}
</AsignacionContext.Provider>

  )
}
