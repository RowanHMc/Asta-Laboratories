import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

// This hook is intentionally exported with the provider from this module.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// Only these email addresses receive the admin role.
const ADMIN_EMAILS = ["admin@astalabs.org"];
const isAdminEmail = (email) => ADMIN_EMAILS.includes(email?.trim().toLowerCase());
const normalizeRole = (role) => (
  role?.trim().toLowerCase() === "admin" ? "admin" : "student"
);
const getUserRole = (user, data) => (
  isAdminEmail(user.email) ? "admin" : normalizeRole(data?.role)
);

export function AuthProvider ({children}){
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); 

const applyProfile = (user, data) => {
    const role = getUserRole(user, data);
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
        const role = isAdminEmail(email) ? "admin" : "student";

      try {
        await setDoc(doc(db, 'users', user.uid), {
          fullName,
          email,
          role,
          createdAt: new Date(),
        });
      } catch (error) {
        // The Firebase Auth account is valid even if the optional profile
        // document cannot yet be saved (for example, because of Firestore rules).
        console.error("Unable to save the user profile:", error);
      }
  
    setCurrentUser(user);
    applyProfile(user, {fullName, role})
    return role;
    };
    // login - ftch details from firestore
    const login = async (email, password, requestedRole) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        let data = null;

        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          data = docSnap.exists() ? docSnap.data() : null;
        } catch (error) {
          // Do not turn a successful Authentication sign-in into a failed login
          // just because the optional Firestore profile document is unavailable.
          console.error("Unable to load the user profile during login:", error);
        }

        const role = getUserRole(user, data);

        if (requestedRole && requestedRole !== role) {
          await signOut(auth);
          setCurrentUser(null);
          setUserProfile(null);
          setUserRole(null);
          throw new Error(`This account is registered as a ${role}, not an ${requestedRole}.`);
        }

        setCurrentUser(user);
        applyProfile(user, data);
        return role;
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
        // Do not leave public pages inaccessible if Firebase is offline or its
        // initial auth check does not return promptly.
        const loadingTimeout = window.setTimeout(() => {
          setLoading(false);
        }, 3000);

        const unsubscribe = onAuthStateChanged(
          auth,
          async (user) => {
            try {
              if (user) {
                setCurrentUser(user);
                const docSnap = await getDoc(doc(db, "users", user.uid));
                applyProfile(user, docSnap.exists() ? docSnap.data() : null);
              } else {
                setCurrentUser(null);
                setUserProfile(null);
                setUserRole(null);
              }
            } catch (error) {
              // A missing or inaccessible profile must not prevent the app from rendering.
              console.error("Unable to load the user profile:", error);
              if (user) {
                setCurrentUser(user);
                applyProfile(user, null);
              }
            } finally {
              window.clearTimeout(loadingTimeout);
              setLoading(false);
            }
          },
          (error) => {
            console.error("Unable to determine the authentication state:", error);
            setCurrentUser(null);
            setUserProfile(null);
            setUserRole(null);
            window.clearTimeout(loadingTimeout);
            setLoading(false);
          },
        );

        return () => {
          window.clearTimeout(loadingTimeout);
          unsubscribe();
        };
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
      {loading ? (
        <div role="status" aria-live="polite">Loading ASTA Labs...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
   )

}
