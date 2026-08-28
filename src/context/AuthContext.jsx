import React, { createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const Authcontext = createContext();
export const useAuth = () => useContext(Authcontext);

export function AuthProvider ({children}){
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); 

//   sign up and save info
    const signup = async (email, password, fullname, role) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
      fullName,
      email,
      role, 
      createdAt: new Date()
    });  

    setUserRole(role);
    setCurrentUser(user);
    return user;
    };
    // login
    const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    };
    // logout
    const logout = () => {
    setUserRole(null);
    return signOut(auth);
    };

    // check for change and fetch roles
    useEffect(() => {
        const unsubScribe = onAuthStateChanged(auth, async (user) =>{
            if (user){
            setCurrentUser(user)
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()){
                setUserRole(docSnap.data().role);
            }
            }else{
                setCurrentUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });
    },[])

    

}