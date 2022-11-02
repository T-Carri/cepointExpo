import React, {createContext, useState, useContext, useEffect} from 'react'
import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore"
import { auth } from '../../firebase-config';
const AsignacionContext = createContext()  
export default AsignacionContext;

 export const AsignacionProvider = ({children}) => {
   const [asignacion, setAsignacion]= useState("test")
   const [currentU, setCurrentU] = useState()
   const [uidAsignacion, setUidAsignacion ] = useState('')
   const [postReg, setPostReg] = useState()
  // const [actualizado, setActualizado]= useState('')
   const dato= auth.currentUser;
    if (dato!==null){
      console.log( "uid desde checador:", dato.uid )
       //setCurrentU(dato.uid)
    }

    const getPresupuestos =async () => { 
        const querydb=getFirestore();
        const q = query(collection(querydb, "asignaciones"),where("residenteUid", "==", dato.uid ))
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
        },[dato.uid])
            

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

     return (
<AsignacionContext.Provider value={ {asignacion, currentU, uidAsignacion, putAsistencia, setPostReg}   }>
{children}
</AsignacionContext.Provider>

  )
}
