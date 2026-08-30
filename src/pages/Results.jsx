import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ArrowLeft, Plus, Save, TestTube, Trash2 } from "lucide-react";



export default function Results(){
    const {userProfile} = useAuth();
    const navigate = useNavigate();
    const [experimentName, setExperimentName] = useState("");
    const [rows, setRows] = useState([
        {id:1, experiment:"", observation:"", conclusion:""}
    ]);
    const [saving, setSaving] = useState(false);

    const handleAddRow = () => {
        setRows((prev) => [
            ...prev, {id: Date.now(), experiment:"", observation:"", conclusion:""}
        ])
    }
    // delete
    const handleRemoveRow = (id) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
    }
    // edit
    const handleInputChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
//   save
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!experimentName.trim()) return;

    setSaving(true);
    try{
        await addDoc(collection(db, "experiment_results"), {
            title: experimentName,
            studentName: userProfile?.displayName  && userProfile?.email,
            entries: rows.map(({ experiment, observation, conclusion }) => ({
          experiment,
          observation,
          conclusion
        })),
        createdAt: serverTimestamp()
    })
    // back to expts
    navigate("/experiments");
} catch(err){
    console.error("failed to save", err);
}finally{
    setSaving(false);
}
}

return(
<div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <RouterLink
          to="/experiments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Experiments
        </RouterLink>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
          Dynamic Data Entry
        </span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#064e3b] flex items-center justify-center border border-emerald-100">
            <TestTube className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">Record Experiment Results</h1>
            <p className="text-xs text-slate-500">
              Log your dynamic trial observations and conclusions step-by-step.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/*  Expt title */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Overall Experiment Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. PCR Amplification & Gel Electrophoresis Analysis"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              className="w-full p-2.5 text-sm bg-[#f8faf9] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

         { /* empty Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3">Experiment Step / Test</th>
                  <th className="p-3">Observation</th>
                  <th className="p-3">Conclusion</th>
                  <th className="p-3 w-16 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, index) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-400 text-center">{index + 1}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sample A Heating"
                        value={row.experiment}
                        onChange={(e) => handleInputChange(row.id, "experiment", e.target.value)}
                        className="w-full p-2 bg-[#f8faf9] border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#064e3b]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Precipitates formed at 65°C"
                        value={row.observation}
                        onChange={(e) => handleInputChange(row.id, "observation", e.target.value)}
                        className="w-full p-2 bg-[#f8faf9] border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#064e3b]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. DNA denatured successfully"
                        value={row.conclusion}
                        onChange={(e) => handleInputChange(row.id, "conclusion", e.target.value)}
                        className="w-full p-2 bg-[#f8faf9] border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#064e3b]"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(row.id)}
                        disabled={rows.length === 1}
                        className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleAddRow}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Row
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-[#064e3b] hover:bg-[#04392b] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Results"}
            </button>
          </div>
        </form>
      </div>
    </div>


)
};
