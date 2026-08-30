import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const STATUS_STYLE = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approoved:"bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected:"bg-red-50 text-red-700 border-red-200",
};


export default function LabBookings(){
    const { userProfile } = useAuth();
    const isAdmin = userProfile?.role === "admin";
    const [labs, setLabs] = useState([]);
    const [form, setForm] = useState({labName:"", bookingTime: "", experiment:""})
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const q = query(collection(db, "lab_bookings"), orderBy("createdAt", "desc"));
        return onSnapshot(q, (snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setBookings(docs); 
        setLabs((prev) => Array.from(new Set([...prev, ...docs.map((d) => d.labName).filter(Boolean)])));
    });
}, []);

// update form
const updateForm = (key) => (e) => setForm((f) => ({...f, [key]: e.target.value}))
const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.labName.trim() || !form.bookingTime || !form.experiment.trim())
        return;
    setLoading(true);
    try{
        await addDoc(collection(db, "lab_bookings"),{
            ...form,
        studentName: userProfile?.displayName || userProfile?.email,
        studentEmail: userProfile?.email || "",
        status: "pending",
        createdAt: serverTimestamp(),
        });
           setLabs((prev) => (prev.includes(form.labName) ? prev : [...prev, form.labName]));
      setForm((f) => ({ ...f, bookingTime: "", experiment: "" }));
    } catch (err) {
      console.error("Failed to submit booking:", err);
    } finally {
      setLoading(false);
    }   
    };

    const setStatus = (id, status) =>
    updateDoc(doc(db, "lab_bookings", id), { status }).catch((err) => console.error("Failed to update status:", err));

  const rows = isAdmin ? bookings : bookings.filter((b) => b.studentEmail === userProfile?.email);

     return(
    
    );
};

   
