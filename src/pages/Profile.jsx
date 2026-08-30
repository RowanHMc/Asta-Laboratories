import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const FIELD = "w-full p-2.5 text-xs bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]";
const LABEL = "block text-xs font-semibold text-slate-600 mb-1";

export default function Profile(){
    const { userProfile, currentUser} = useAuth();
    const [form, setForm] = useState({displayName:"", photoURL: "", department:""});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

useEffect(() => {
    if(!currentUser) return;
    setForm((f) => ({
        ...f,
      displayName: userProfile?.displayName || currentUser.displayName || "",
      photoURL: userProfile?.photoURL || currentUser.photoURL || "",
    }));
   getDoc(doc(db, "users", currentUser.uid))
      .then((snap) => {
        if (snap.exists()) {
          const { department = "" } = snap.data();
          setForm((f) => ({ ...f, department }));
        }
      })
      .catch((err) => console.error("Error fetching user details:", err));
  }, [currentUser, userProfile]); 

  const set = (key) => (e) => setForm((f) => ({...f, [key]: e.target.value}));

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    setSuccess(false);

    try {
      await updateProfile(currentUser, { displayName: form.displayName, photoURL: form.photoURL });
      await setDoc(doc(db, "users", currentUser.uid), { ...form, updatedAt: new Date().toISOString() }, { merge: true });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };



};