import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase/config";
import { Check, Mail, Save, Shield, User } from "lucide-react";

const FIELD = "w-full p-2.5 text-xs bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]";
const LABEL = "block text-xs font-semibold text-slate-600 mb-1";

export default function Profile(){
    const { userProfile, currentUser} = useAuth();
    const [form, setForm] = useState({displayName:"", photoURL: "", department:""});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

useEffect(() => {
    if(!currentUser) return;
    let isMounted = true;

    getDoc(doc(db, "users", currentUser.uid))
      .then((snap) => {
        if (isMounted) {
          const { department = "" } = snap.exists() ? snap.data() : {};
          setForm({
            displayName: userProfile?.displayName || currentUser.displayName || "",
            photoURL: userProfile?.photoURL || currentUser.photoURL || "",
            department,
          });
        }
      })
      .catch((err) => console.error("Error fetching user details:", err));

    return () => {
      isMounted = false;
    };
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

  return(
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <User className="w-5 h-5 text-[#064e3b]" /> Account Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your public profile and account details.</p>
        </div>
        {success && (
          <span className="text-xs font-medium px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" /> Saved successfully!
          </span>
        )}
      </div>

       <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-[#064e3b]/20 overflow-hidden flex items-center justify-center text-slate-400 shadow-inner shrink-0">
            {form.photoURL ? (
              <img src={form.photoURL} alt="Profile" className="w-full h-full object-cover" onError={(e) => (e.target.src = "")} />
            ) : (
              <User className="w-12 h-12" />
            )}
          </div>
          <div className="flex-1 w-full">
            <label className={LABEL}>Profile Picture URL</label>
            <input type="url" placeholder="https://example.com/avatar.jpg" value={form.photoURL} onChange={set("photoURL")} className={FIELD} />
            <p className="text-[10px] text-slate-400 mt-1">Paste a direct image link to update your avatar picture.</p>
          </div>
        </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">Personal Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Full Name</label>
              <input type="text" required value={form.displayName} onChange={set("displayName")} className={FIELD} />
            </div>
            <div>
              <label className={LABEL + " flex items-center justify-between"}>
                Email Address
                <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Read Only</span>
              </label>
              <div className="relative">
                <input type="email" disabled value={currentUser?.email || ""} className="w-full p-2.5 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-mono" />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Department / Faculty</label>
              <input type="text" placeholder="e.g. Biological Sciences" value={form.department} onChange={set("department")} className={FIELD} />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" disabled={loading} className="px-5 py-2.5 bg-[#064e3b] hover:bg-[#04392b] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer transition-colors">
              <Save className="w-4 h-4" />
              {loading ? "Saving Changes..." : "Save Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>

  )
};
