import {createContext, useState, useContext, useEffect} from 'react'
import { auth } from '../../firebase-config';
import { getFirestore, doc, get, query, where, collection, getDocs, onSnapshot} from "firebase/firestore"
 const CepointContext = createContext()                                 
 export default CepointContext;
 /* export const Cepoint = () => {
   return useContext(CepointContext);
  }; */
  const initialValue = false;
  
  export const CepointProvider = ({children}) => {
    const [asignacion, setAsignacion]= useState("test")
  const [registro, setRegistro] = useState("registro, yeah")
    
    const dato= auth.currentUser;
    if (dato!==null){
      console.log( "uid desde checador:", dato.uid )
    }
    const getPresupuestos =async () => {
        const querydb=getFirestore();
        const q = query(collection(querydb, "asignaciones"),where("residenteUid", "==", dato.uid ))
        await onSnapshot(q, (query)=>{
          const data=[]
          query.forEach((doc)=>{
            data.push(doc.data())
          })
      
          setAsignacion(data)
        }) }
      
        useEffect(()=>{
            getPresupuestos()
        },[])

       // const data = {asignacion, getPresupuestos}
  

        return(
<CepointContext.Provider value={ {asignacion, registro, setRegistro}   }>
{children}
</CepointContext.Provider>

            )
      
        }
          

