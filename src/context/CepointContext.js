import React, {createContext, useReducer, useContext, useEffect} from 'react'
import { GlobalState, TYPES } from '../redux/GlobalState';
//Usuario
import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore"
import UserContext from './AuthContext';

//Registro
//import { getFirestore, update, FieldValue, get, query, where, collection, getDoc, onSnapshot, doc, updateDoc, arrayUnion} from "firebase/firestore"
//import AsignacionContext from './AsignacionContext';

//asignacion
//import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore"
//import {  ref, uploadBytes, uploadString } from "firebase/storage";
//import { auth, storage } from '../../firebase-config';
//import UserContext from './AuthContext';
//import RegistroContext from './RegistroContext';



const CepointContext = createContext()  
export default CepointContext;

const initialstate= {
  userAccessDetail: ''
 
}





export const CepointContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(GlobalState,  initialstate);

 const {user} = useContext(UserContext)
 
    //const [Usuario, setUsuario]= useState({})
     console.log('hay usuario?: ', user)

    const accessKey = async()=>{
      const db=getFirestore();
        const queryDoc = doc(db, "users", user.uid)
        await getDoc(queryDoc).then(res=>{
           dispatch({type:TYPES.CALL_ACCESOS, payload:res.data()})
           // setUsuario(res.data())
        })
    }

    useEffect(()=>{
      accessKey()


    }
        ,[user]) 

   //console.log('Usuario:', Usuario)


   //RegistroCONTEXT
  
  /*   const [registro, setRegistro] = useState([])
    const [usuarioAsistencia, setUsuarioAsistencia] =useState([])
    const [tipoAsistencia, setTipoAsistencia] = useState(0)
    const [image, setImage] = useState(null);
    const[semana, setSemana] =React.useState()
    const querydb=getFirestore();
    
    const Usuario = []

        const fetchUser = async (data) => {  
         const ref = doc(querydb, "users", data)
         const docSnap = await getDoc(ref)
       
        if(docSnap.exists()) {
          const user = docSnap.data()
          console.log("fetch user",user.toString())
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
     } */

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
  /*  useEffect(
    ()=>{
    
      setSemana(numeroDeSemana(new Date()))
  
    },[])
  
    const numeroDeSemana = fecha => {
      const DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24,
          DIAS_QUE_TIENE_UNA_SEMANA = 7,
          JUEVES = 4;
      fecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()));
      let diaDeLaSemana = fecha.getUTCDay(); // Domingo es 0, sábado es 6
      if (diaDeLaSemana === 0) {
          diaDeLaSemana = 7;
      }
      fecha.setUTCDate(fecha.getUTCDate() - diaDeLaSemana + JUEVES);
      const inicioDelAño = new Date(Date.UTC(fecha.getUTCFullYear(), 0, 1));
      const diferenciaDeFechasEnMilisegundos = fecha - inicioDelAño;
      return Math.ceil(((diferenciaDeFechasEnMilisegundos / DIA_EN_MILISEGUNDOS) + 1) / DIAS_QUE_TIENE_UNA_SEMANA);
  
     
  };
  
  const numeroDeSemanaActual = numeroDeSemana(new Date());

 */




//Asignacion context



/* const [asignacion, setAsignacion]= useState("test")
const [currentU, setCurrentU] = useState()
const [uidAsignacion, setUidAsignacion ] = useState('')
const [postReg, setPostReg] = useState() */
//const {user} = useContext(UserContext)
//const {registro}=useContext(RegistroContext)
//  const [usuario, setUsuario] = useState(user.uid)
// const [actualizado, setActualizado]= useState('')
/*  const dato= auth.currentUser;
 if (dato!==null){
   console.log( "uid desde checador:", dato.uid )
    //setCurrentU(dato.uid)
 } */

/* 

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
 */
/* function uploadFile(file) {
const storageRef = ref(storage, 'Asistencias')
uploadString(storageRef, file, 'base64url').then((snapshot)=>{
console.log('Uploaded a data_url string!')
})

} */






  return (
    <CepointContext.Provider value={{state }}>

        {children}
    </CepointContext.Provider>
  )
}
