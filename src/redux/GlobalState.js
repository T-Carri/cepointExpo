

export const TYPES ={ 
    CALL_ACCESOS: 'CALL_ACCESOS', 
    REGISTRO_STATE: 'REGISTRO_STATE',
    REGISTRO_PHOTO:'REGISTRO_PHOTO', 
    CALL_PRESUPUESTO: 'CALL_PRESUPUESTO',
    SET_LOCATION: 'SET_LOCATION',
    PUT_ASISTENCIA: 'PUT_ASISTENCIA', 
}
    

export const GlobalState=(state, action )=>{
switch(action.type){
    case TYPES.CALL_ACCESOS:
        return {
            ...state,
            userAccessDetail: action.payload
        }
     
    case TYPES.REGISTRO_STATE:
       return {
                ...state,
                RegistroAsistenciaDetail: action.payload
            }
           
    case TYPES.REGISTRO_PHOTO:
        return {
                 ...state,
                 RegistroPhotoDetail: action.payload
             }

   case TYPES.CALL_PRESUPUESTO:
         return {
                   ...state,
                PresupuestoDetail: action.payload
                                   }           
   case TYPES.SET_LOCATION:
         return {
                   ...state,
           LocationDetail: action.payload
   }   
  case TYPES.PUT_ASISTENCIA:
        return {
                  ...state,
          PutAsistenciaDetail: action.payload
      }          
}
    
}