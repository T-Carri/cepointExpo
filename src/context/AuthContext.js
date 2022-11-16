import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../../firebase-config';


const UserContext = createContext();
export default UserContext
/* 
export const UserAuth = () => {
  return useContext(UserContext);
};
 */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const dispatch=useDispatch();
 // const firestore= getFirestore(app)
   //version normal 
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    
    
  };
 const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
    
   }


  const logout = () => {
      return signOut(auth)
      
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('there somebody in auth?: ',currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
console.log('usuario actual:', user)
  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};


//playboi carti designer shoes