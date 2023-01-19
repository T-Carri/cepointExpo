

export const TYPES ={ 
    CALL_ACCESOS: 'CALL_ACCESOS', 
    REGISTRO_STATE: 'REGISTRO_STATE',
    REGISTRO_PHOTO:'REGISTRO_PHOTO', 
    TIPO_ASISTENCIA: 'TIPO_ASISTENCIA', 
    CALL_PRESUPUESTO: 'CALL_PRESUPUESTO',
    SET_USUARIO_ASISTENCIA: 'SET_USUARIO_ASISTENCIA'
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
    case TYPES.TIPO_ASISTENCIA:
          return {
                   ...state,
                TipoAsistenciaDetail: action.payload
                     }
   case TYPES.CALL_PRESUPUESTO:
         return {
                   ...state,
                PresupuestoDetail: action.payload
                                   }           
   case TYPES.SET_USUARIO_ASISTENCIA:
         return {
                   ...state,
           UsuarioAsistenciaDetail: action.payload
                                                              }         
}
    
}