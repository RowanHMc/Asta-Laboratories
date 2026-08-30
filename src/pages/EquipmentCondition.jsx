import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AlertTriangle, CheckCircle2, Plus, Trash2, Wrench, XCircle } from "lucide-react";
import { db } from "../firebase/config";
import { collection,addDoc, updateDoc, deleteDoc, doc,onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

const STATUS_CONFIG= {
    perfect: {
        label: "Perfect working condition",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2
    },
    maintenance:{
        label:"near maintenance",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: AlertTriangle
    },
    out_of_service:{
        label: "Outof commision",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: XCircle
    }
}

export default function EquipmentCondition(){
    const {userProfile} = useAuth();
    const isAdmin = userProfile?.role == "admin";
    const [equipmentList, setEquipmentList] = useState([]);
    const[name, setName] = useState("");
    const [category, setCategory] = useState("General");
    const [condition, setCondition] = useState("perfect")
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        const q = query(collection(db, "equipment"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setEquipmentList(items);
    });
    return () => unsubscribe();
  }, [])

  // adding items
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "equipment"), {
        name,
        category,
        condition,
        createdAt: serverTimestamp(),
      });
      setName("");
    } catch (err) {
      console.error("Failed to add equipment:", err);
    } finally {
      setLoading(false);
    }
  };
  // update 
  const handleUpdateCondition = async (id, newCondition) => {
    try {
      await updateDoc(doc(db, "equipment", id), { condition: newCondition });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };
  // delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "equipment", id));
    } catch (err) {
      console.error("Failed to delete equipment:", err);
    }
  };
    

    return(
  <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-[#064e3b]" />
          Laboratory Equipment Condition
        </h2>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
          {isAdmin ? "Admin Controls Enabled" : "Student View (Read-Only)"}
        </span>
      </div>

    {isAdmin && (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-45">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Equipment Name</label>
            <input
              type="text"
              required
              placeholder="e.g. PCR Thermal Cycler"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-sm bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div className="w-40">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
            <input
              type="text"
              placeholder="e.g. Molecular Biology"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 text-sm bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div className="w-48">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Initial Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-2 text-sm bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            >
              <option value="perfect">In Perfect Working Condition</option>
              <option value="maintenance">Nearing Maintenance</option>
              <option value="out_of_commission">Out of Commission</option>
            </select>
          </div>

        <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#064e3b] hover:bg-[#04392b] text-white text-sm font-semibold rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>
    )}

    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
            <tr>
              <th className="p-3">Equipment</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status Condition</th>
              {isAdmin && <th className="p-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {equipmentList.map((item) => {
              const status = STATUS_CONFIG[item.condition] || STATUS_CONFIG.perfect;
              const StatusIcon = status.icon;

              return (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                  <td className="p-3 text-slate-500">{item.category}</td>
                  
                  <td className="p-3">
                    {isAdmin ? (
                      <select
                        value={item.condition}
                        onChange={(e) => handleUpdateCondition(item.id, e.target.value)}
                        className="p-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#064e3b]"
                      >
                        <option value="perfect">In Perfect Working Condition</option>
                        <option value="maintenance">Nearing Maintenance</option>
                        <option value="out_of_commission">Out of Commission</option>
                      </select>
                    ) : (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${status.badge}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    )}
                  </td>  

                    {isAdmin && (
                  <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
            {equipmentList.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? "4" : "3"} className="p-4 text-center text-xs text-slate-400">
                  No lab equipment registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>   

        
    );
};
