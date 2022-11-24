import React, {createContext, useState, useContext, useEffect} from 'react'
import { getFirestore, update, FieldValue, get, query, where, collection, getDoc, onSnapshot, doc, updateDoc, arrayUnion} from "firebase/firestore"
import AsignacionContext from './AsignacionContext';

const RegistroContext = createContext()  
export default RegistroContext;

export const RegistroProvider = ({children}) => {
 // const {uidAsignacion} = useContext(AsignacionContext)

    
    const [registro, setRegistro] = useState([])
    const [usuarioAsistencia, setUsuarioAsistencia] =useState([])
    const [tipoAsistencia, setTipoAsistencia] = useState(0)
    const [image, setImage] = useState(null);
    const [alborotador, setAlborotador]= useState(false)
  
    const querydb=getFirestore();
    const Usuario = []

        const fetchUser = async (data) => {  
         const ref = doc(querydb, "users", data)
         const docSnap = await getDoc(ref)
       
        if(docSnap.exists()) {
          const user = docSnap.data()
          // console.log("fetch user",user.toString())
            Usuario.push(user)
            
        }else{ 
          console.log("No such document!")
        }
       
        setRegistro(Usuario)

      }

      const activaOcupado = async ()=> {
         const ref = doc(querydb, "users", usuarioAsistencia)
         await updateDoc(ref, {ocupado: true})
      }
      const desactivaOcupado = async ()=> {
        const ref = doc(querydb, "users", usuarioAsistencia)
        await updateDoc(ref, {ocupado: false})
     }

    /*  useEffect(()=>{
               fetchUser()
     },[registro])

       */
     
   /*   useEffect(()=>{
           ()=> {}
          console.log('MONTAJE: ', registro)
          return ()=> {console.log('CLEANER: ', registro)}
        }, [registro]) */
          
 /*       
 useEffect(()=>{
activaOcupado()
return()=> activaOcupado()
 },[usuarioAsistencia] )
            
 useEffect(()=>{
  desactivaOcupado()
  return()=> desactivaOcupado()
   },[usuarioAsistencia] )
 */




    return (
        <RegistroContext.Provider value={ 
          { registro, 
          setRegistro, 
          usuarioAsistencia, 
          setUsuarioAsistencia, 
          tipoAsistencia, 
          setTipoAsistencia, 
          setImage,
          image,
          activaOcupado,
          desactivaOcupado, 
          fetchUser}   }>
        {children}
        </RegistroContext.Provider>
  )
}
