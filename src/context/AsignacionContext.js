import React, {createContext, useState, useContext, useEffect} from 'react'
import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot} from "firebase/firestore"
import { auth } from '../../firebase-config';
const AsignacionContext = createContext()  
export default AsignacionContext;

 export const AsignacionProvider = ({children}) => {
   const [asignacion, setAsignacion]= useState("test")
   const [currentU, setCurrentU] = useState()
   const [uidAsignacion, setUidAsignacion ] = useState('')
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
         
          query.forEach((doc)=>{
            data.push(doc.data())
            console.log("UIDD", doc.id)
            setUidAsignacion(doc.id)
          })
      
          setAsignacion(data)
        }) }
        useEffect(()=>{
            getPresupuestos()
        },[])
            

console.log('desde asignacion context:', uidAsignacion )            
     return (
<AsignacionContext.Provider value={ {asignacion, currentU, uidAsignacion}   }>
{children}
</AsignacionContext.Provider>

  )
}
