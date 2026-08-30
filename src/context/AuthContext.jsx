import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider ({children}){
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); 

//   sign up and save info
    const signup = async (email, password, fullName, role) => {
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
 // check for change and fetch roles
    useEffect(() => {
        const unsubScribe = onAuthStateChanged(auth, async (user) =>{
            if (user){
                setCurrentUser(user); //[cite: 2]
                
                try {
                    const docRef = doc(db, 'users', user.uid); //[cite: 2]
                    const docSnap = await getDoc(docRef); //[cite: 2]

                    if (docSnap.exists()){ //[cite: 2]
                        setUserRole(docSnap.data().role); //[cite: 2]
                    }
                } catch (error) {
                    console.error("Failed to fetch user role (Client may be offline):", error);
                }
            } else {
                setCurrentUser(null); //[cite: 2]
                setUserRole(null); //[cite: 2]
            }
            setLoading(false); //[cite: 2]
        });
        
        return unsubScribe; //[cite: 2]
    }, [])

   const value ={
    currentUser,
    userRole,
    signup,
    login,
    logout
   } 
   return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
   )

}
