import React, {createContext, useReducer, useContext, useEffect, useState} from 'react'
import { GlobalState, TYPES } from '../redux/GlobalState';
//Usuario
import { getFirestore, doc, get, query, where, collection, getDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore"
import UserContext from './AuthContext';



const CepointContext = createContext()  
export default CepointContext;

const initialstate= {
  userAccessDetail: '',
  RegistroAsistenciaDetail:'', 
  RegistroPhotoDetail: '', 
  TipoAsistenciaDetail: '', 
  PresupuestoDetail:'', 
  UsuarioAsistenciaDetail:''
}


                     


export const CepointContextProvider = ({children}) => {
  const db=getFirestore();
  const [state, dispatch] = useReducer(GlobalState,  initialstate);
  const [semana, setSemana] = useState()
  const {user} = useContext(UserContext)
 
    //const [Usuario, setUsuario]= useState({})
     console.log('hay usuario?: ', user)

    const accessKey = async()=>{
      const db=getFirestore();
        const queryDoc = doc(db, "users", user.uid)
        await getDoc(queryDoc).then(res=>{
           dispatch({type:TYPES.CALL_ACCESOS, payload:res.data()})
      
        })
    }

    useEffect(()=>{
      accessKey()


    }
        ,[user]) 

   //console.log('Usuario:', Usuario)


   //RegistroCONTEXT
  

    const fetchUser = async(data)=>{
      const db=getFirestore();
        const queryDoc = doc(db, "users", data)
        await getDoc(queryDoc).then(res=>{
           dispatch({type:TYPES.REGISTRO_STATE, payload:res.data()})
           // setUsuario(res.data())
        })
    }



       const activaOcupado = async (dato)=> {
         const ref = doc(db, "users", dato)
         await updateDoc(ref, {ocupado: true})
      }
      const desactivaOcupado = async (dato)=> {
        const ref = doc(db, "users", dato)
        await updateDoc(ref, {ocupado: false})
     } 

  


//Asignacion context

const getPresupuestos =async () => { 

  const q = query(collection(db, "asignaciones"),where("residenteUid", "==", user.uid ))
  await onSnapshot(q, (query)=>{
    
          
    query.forEach((doc)=>{
      dispatch({type:TYPES.CALL_PRESUPUESTO, payload:doc.data()})
      
     
    })
    
    
  }) }

  useEffect(()=>{
      getPresupuestos()
  },[user])







  useEffect(
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





  const putAsistencia = async(dato) =>{
    const querydb=getFirestore();
    
    const q = doc(querydb, "asignaciones", dato);
    await updateDoc( q, {
  
      asistencias : arrayUnion(state.UsuarioAsistenciaDetail)
    }
      
    )
  }
  
  







  return (
    <CepointContext.Provider value={{state, dispatch, TYPES, fetchUser,   activaOcupado,
      desactivaOcupado, semana, putAsistencia }}>

        {children}
    </CepointContext.Provider>
  )
}
