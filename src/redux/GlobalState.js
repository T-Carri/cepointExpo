

export const TYPES ={ 
    CALL_ACCESOS: 'CALL_ACCESOS', 
   
}

export const GlobalState=(state, action )=>{
switch(action.type){
    case TYPES.CALL_ACCESOS:
        return {
            ...state,
            userAccessDetail: action.payload
        }
     
 
}
    
}