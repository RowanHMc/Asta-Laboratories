import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addDoc } from "firebase/firestore";

const PRESENT_EXPERIMENTS = [
    {
    id: "exp-001",
    title: "DNA Extraction from Plant Tissue",
    category: "Molecular Biology",
    description: "Extraction and purification of genomic DNA using CTAB protocol.",
    equipmentNeeded: ["Centrifuge", "Thermal Cycler / Water Bath", "Micropipettes (P1000, P200)", "Mortar & Pestle"],
    reagents: ["Ethanol", "Isopropanol", "Chloroform"], // Reagents used to fetch hazard profiles via API
    procedure: [
      "Homogenize 100mg plant tissue in CTAB extraction buffer using mortar and pestle.",
      "Incubate lysate at 60°C for 30 minutes in a water bath.",
      "Add equal volume of Chloroform:Isoamyl alcohol (24:1) and centrifuge at 12,000 rpm for 10 min.",
      "Transfer upper aqueous phase to a clean tube and precipitate DNA with ice-cold Isopropanol."
    ],
    expectedResults: "Visible high-molecular-weight genomic DNA pellet; OD 260/280 ratio between 1.8 and 2.0."
  }
]

    export default function Experiments() {
        const {userProfile} = useAuth();
        const [searchTerm, setSearchTerm] = useState("");
        const [selectedExperiment, setSelectedExperiment] = useState(null);
        const [hazardData, setHazardData] = useState({});
        const [loadingHazards, setLoadingHazards] = useState(false);
        const [completedList, setCompletedList] = useState([]);
        const [submitting, setSubmitting] = useState(false);

        useEffect(() => {
          const q = query(collection(db, "completed_experiments"), orderBy("completedAt", "desc"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
            const logs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
      }));
      setCompletedList(logs);
    });
    return () => unsubscribe();
    }, []);
        
// fetch expt data
    const fetchHazards = async (reagentList) => {
    setLoadingHazards(true);
    const fetchedHazards = {};

for (const reagent of reagentList) {
      try {
        const res = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(reagent)}/property/Title,GHSClassification/JSON`
        );
        if (res.ok) {
          const data = await res.json();
          fetchedHazards[reagent] = "Hazardous chemical — handle under fume hood with protective equipment.";
        } else {
          fetchedHazards[reagent] = "Standard laboratory precautions apply.";
        }
      } catch (err) {
        fetchedHazards[reagent] = "Safety data unavailable.";
      }
    }

    setHazardData(fetchedHazards);
    setLoadingHazards(false);
  };

  // open expts
  const handleOpenExperiments =(exp) =>{
    setSelectedExperiment(exp);
    fetchHazards(exp.reagents);
  };

  // save expts to firestore
  const handleMarkAsDone = async (expt) =>{
    setSubmitting(true);
    try{
        await addDoc(collection(db, "completed_experiments"),{
        experimentId: exp.id,
        title: exp.title,
        category: exp.category,
        studentName: userProfile?.displayName || userProfile?.email || "Anonymous Student",
        completedAt: serverTimestamp(),
        });
        setSelectedExperiment(null)
    } catch(err){
        console.error("failed to log experiment completion", err);
    }finally{
        setSubmitting(false);
    }
  };
  const filteredExperiments = PRESET_EXPERIMENTS.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
        <div className="p-6 max-w-5xl mx-auto space-y-8">
  {/* header */}
     <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-[#064e3b]" />
          Laboratory Experiments Portal
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Search lab protocols, review equipment requirements, API chemical safety hazards, and track progress.
        </p>
      </div>
      {/* search  */}
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

      {/* protocal grid  */}
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
      {/* completed  */}
 



        );
    }