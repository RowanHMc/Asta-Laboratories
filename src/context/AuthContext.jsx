import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// predefined admin account. only this emails are assigned admin
const ADMIN_EMAILS = ["admin@astalabs.org"];

export function AuthProvider ({children}){
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); 

const applyProfile = (user, data) => {
    const role = ADMIN_EMAILS.includes(user.email) ? "admin" : data?.role || "student";
    const profile = {
      uid: user.uid,
      email: user.email,
      displayName: data?.fullName || user.displayName || "",
      photoURL: data?.photoURL || user.photoURL || "",
      role,
    };
    setUserProfile(profile);
    setUserRole(role);
    return role;   
}

//   sign up and save info, sign in always takes student role. a
    const signup = async (email, password, fullName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const role = ADMIN_EMAILS.includes(email) ? "admin" : "student";

      await setDoc(doc(db, 'users', user.uid), {
      fullName,
      email,
      role, 
      createdAt: new Date()
    });  
  
    setCurrentUser(user);
    applyProfile(user, {fullName, role})
    return role;
    };
    // login - ftch details from firestore
    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const data = docSnap.exists() ? docSnap.data() : null;
        setCurrentUser(user);
        return applyProfile(user, data)
    };
    // logout
    const logout = () => {
    setUserRole(null);
    setUserProfile(null);
    setCurrentUser(null);
    return signOut(auth);
    };

    // check for change and fetch roles
 // check for change and fetch roles
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) =>{
            if (user){
                setCurrentUser(user);
                const docSnap = await getDoc(doc(db, "users", user.uid));
                applyProfile(user, docSnap.exists() ? docSnap.data() : null);
                
            } else {
                setCurrentUser(null); 
                setUserProfile(null);
                setUserRole(null);
            }
            setLoading(false); 
        });
        return unsubscribe;
    }, [])

   const value ={
    currentUser,
    userProfile,
    userRole,
    loading,
    signup,
    login,
    logout
   }; 
   return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
   )

}
