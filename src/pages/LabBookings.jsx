import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Check, FlaskConical, Send, ShieldCheck, X } from "lucide-react";

const STATUS_STYLE = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

export default function LabBookings() {
  const { userProfile } = useAuth();
  const isAdmin = userProfile?.role === "admin";
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({ labName: "", bookingTime: "", experiment: "" });
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "lab_bookings"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBookings(docs);
      setLabs((prev) => Array.from(new Set([...prev, ...docs.map((d) => d.labName).filter(Boolean)])));
    });
  }, []);

  const updateForm = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.labName.trim() || !form.bookingTime || !form.experiment.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "lab_bookings"), {
        ...form,
        studentUid: userProfile?.uid || "",
        studentName: userProfile?.displayName || userProfile?.email || "Student",
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
    updateDoc(doc(db, "lab_bookings", id), {
      status,
      reviewedAt: serverTimestamp(),
      reviewedBy: userProfile?.email || "Administrator",
    }).catch((err) => console.error("Failed to update status:", err));

  const rows = isAdmin ? bookings : bookings.filter((b) => b.studentEmail === userProfile?.email);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {isAdmin ? <ShieldCheck className="w-6 h-6 text-[#064e3b]" /> : <FlaskConical className="w-6 h-6 text-[#064e3b]" />}
            {isAdmin ? "Admin Lab Reservation Desk" : "Reserve Laboratory Space"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAdmin ? "Review, approve, or reject student laboratory space requests." : "Submit your experiment schedule. Track approval statuses live below."}
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
          {isAdmin ? "Admin Mode" : "Student View"}
        </span>
      </div>

      {!isAdmin && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Laboratory</label>
              <input
                list="lab-options"
                required
                placeholder="e.g. Molecular Biology Lab"
                value={form.labName}
                onChange={updateForm("labName")}
                className="w-full p-2.5 text-xs bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
              <datalist id="lab-options">
                {labs.map((lab) => (
                  <option key={lab} value={lab} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Date & Time</label>
              <input
                type="datetime-local"
                required
                value={form.bookingTime}
                onChange={updateForm("bookingTime")}
                className="w-full p-2.5 text-xs bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Experiment to be Done</label>
            <input
              type="text"
              required
              placeholder="e.g. DNA Extraction and PCR Gel Electrophoresis"
              value={form.experiment}
              onChange={updateForm("experiment")}
              className="w-full p-2.5 text-xs bg-[#f8faf9] border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#064e3b] hover:bg-[#04392b] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
            {loading ? "Submitting..." : "Submit for Approval"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isAdmin ? "All Student Lab Requests" : "My Submitted Requests"}
          </h3>
          <span className="text-[11px] font-semibold text-slate-500">Total: {rows.length}</span>
        </div>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
            <tr>
              {isAdmin && <th className="p-3">Student</th>}
              <th className="p-3">Laboratory</th>
              <th className="p-3">Experiment</th>
              <th className="p-3">Scheduled Time</th>
              <th className="p-3">Status</th>
              {isAdmin && <th className="p-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/50">
                {isAdmin && <td className="p-3 font-semibold text-slate-800">{req.studentName}</td>}
                <td className="p-3 text-slate-600">{req.labName}</td>
                <td className="p-3 font-medium text-slate-700">{req.experiment}</td>
                <td className="p-3 font-mono text-slate-500">{req.bookingTime}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase ${STATUS_STYLE[req.status]}`}>
                    {req.status}
                  </span>
                </td>
                {isAdmin && (
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setStatus(req.id, "approved")}
                      disabled={req.status === "approved"}
                      className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-200 disabled:opacity-30 cursor-pointer"
                      title="Approve Booking"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setStatus(req.id, "rejected")}
                      disabled={req.status === "rejected"}
                      className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 disabled:opacity-30 cursor-pointer"
                      title="Reject Booking"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} className="p-4 text-center text-slate-400">
                  No reservation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
