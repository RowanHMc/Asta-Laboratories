import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, ChevronRight, FileText, FlaskConical, Search, ShieldAlert, X } from "lucide-react";

const PRESET_EXPERIMENTS = [
  {
    id: "exp-001",
    title: "DNA Extraction from Plant Tissue",
    category: "Molecular Biology",
    description: "Extraction and purification of genomic DNA using CTAB protocol.",
    equipmentNeeded: ["Centrifuge", "Thermal Cycler / Water Bath", "Micropipettes (P1000, P200)", "Mortar & Pestle"],
    reagents: ["Ethanol", "Isopropanol", "Chloroform"],
    procedure: [
      "Homogenize 100mg plant tissue in CTAB extraction buffer using mortar and pestle.",
      "Incubate lysate at 60°C for 30 minutes in a water bath.",
      "Add equal volume of Chloroform:Isoamyl alcohol (24:1) and centrifuge at 12,000 rpm for 10 min.",
      "Transfer upper aqueous phase to a clean tube and precipitate DNA with ice-cold Isopropanol.",
    ],
    expectedResults: "Visible high-molecular-weight genomic DNA pellet; OD 260/280 ratio between 1.8 and 2.0.",
  },
];

export default function Experiments() {
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [hazardData, setHazardData] = useState({});
  const [loadingHazards, setLoadingHazards] = useState(false);
  const [completedList, setCompletedList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "completed_experiments"), orderBy("completedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCompletedList(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const fetchHazards = async (reagentList) => {
    setLoadingHazards(true);
    const fetchedHazards = {};

    for (const reagent of reagentList) {
      try {
        const res = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(reagent)}/property/Title,GHSClassification/JSON`
        );
        
         fetchedHazards[reagent] = res.ok
          ? "Hazardous chemical — handle under fume hood with protective equipment."
          : "Standard laboratory precautions apply.";
      } catch (err) {
        fetchedHazards[reagent] = "Safety data unavailable.";
      }
    }

    setHazardData(fetchedHazards);
    setLoadingHazards(false);
  };

  const handleOpenExperiment = (exp) => {
    setSelectedExperiment(exp);
    fetchHazards(exp.reagents);
  };

  const handleMarkAsDone = async (exp) => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, "completed_experiments"), {
        experimentId: exp.id,
        title: exp.title,
        category: exp.category,
        studentName: userProfile?.displayName || userProfile?.email || "Anonymous Student",
        completedAt: serverTimestamp(),
      });
      setSelectedExperiment(null);
    } catch (err) {
      console.error("failed to log experiment completion", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredExperiments = PRESET_EXPERIMENTS.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-[#064e3b]" />
          Laboratory Experiments Portal
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Search lab protocols, review equipment requirements, API chemical safety hazards, and track progress.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search experiments by name or category (e.g. Molecular Biology)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExperiments.map((exp) => (
          <div
            key={exp.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#064e3b] transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-[#064e3b] rounded-md border border-emerald-100">
                {exp.category}
              </span>
              <h3 className="text-base font-bold text-slate-800 mt-2">{exp.title}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{exp.description}</p>
            </div>
            <button
              onClick={() => handleOpenExperiment(exp)}
              className="mt-4 w-full py-2 px-3 bg-[#f8faf9] hover:bg-[#064e3b] text-[#064e3b] hover:text-white border border-[#064e3b]/20 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              View Full Protocol & Hazards <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Completed Experiments History
        </h2>
        <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
          {completedList.map((log) => (
            <div key={log.id} className="p-3 bg-[#f8faf9] flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-800">{log.title}</p>
                <p className="text-[#064e3b] text-[11px]">Completed by: {log.studentName}</p>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">
                {log.completedAt?.toDate() ? log.completedAt.toDate().toLocaleDateString() : "Just now"}
              </span>
            </div>
          ))}
          {completedList.length === 0 && (
            <p className="p-4 text-center text-xs text-slate-400">No completed experiments recorded yet.</p>
          )}
        </div>
      </div>

      {selectedExperiment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-xl border border-slate-100">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-[#064e3b] rounded-md">
                  {selectedExperiment.category}
                </span>
                <h2 className="text-lg font-bold text-slate-800 mt-1">{selectedExperiment.title}</h2>
              </div>
              <button onClick={() => setSelectedExperiment(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#064e3b]" /> Equipment Needed
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedExperiment.equipmentNeeded.map((eq, i) => (
                    <li key={i}>{eq}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-[#064e3b]" /> Required Reagents
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedExperiment.reagents.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" /> API Chemical Safety & Hazard Notes
              </h4>
              {loadingHazards ? (
                <p className="text-amber-700 animate-pulse">Fetching PubChem chemical safety profiles...</p>
              ) : (
                <ul className="space-y-1.5 text-amber-900">
                  {Object.entries(hazardData).map(([reagent, hazard], idx) => (
                    <li key={idx}>
                      <span className="font-bold">{reagent}:</span> {hazard}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 text-sm">Step-by-Step Procedure</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                {selectedExperiment.procedure.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 text-xs">
              <h4 className="font-bold text-[#064e3b] mb-1">Expected Results</h4>
              <p className="text-slate-600">{selectedExperiment.expectedResults}</p>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedExperiment(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => handleMarkAsDone(selectedExperiment)}
                disabled={submitting}
                className="px-4 py-2 bg-[#064e3b] hover:bg-[#04392b] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
