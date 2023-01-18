

export const TYPES ={ 
    CALL_ACCESOS: 'CALL_ACCESOS', 
    REGISTRO_STATE: 'REGISTRO_STATE',
    REGISTRO_PHOTO:'REGISTRO_PHOTO'
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


}
    
}