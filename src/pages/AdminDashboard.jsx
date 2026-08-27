import { AlertTriangle, ArrowRight, Calendar, Database, Plus } from "lucide-react";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setIsActiveTab] = useState("All");
  const categories = ["All", "Chemistry", "Biology", "physics"];

  const recentActivity = [
    {
      id: 1,
      title: "Leica DM2500 Microsc...",
      subtitle: "Optics & alignment calibration",
      personnel: "Prof. M. Sterling",
      timestamp: "10:42 AM",
      status: "Active",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Calendar,
      iconBg: "bg-[#064e3b]/10 text-[#064e3b]",
    },
    {
      id: 2,
      title: "Centrifuge  (Bench...",
      subtitle: "Overheating warning",
      personnel: "Dr. Alan Vance",
      timestamp: "09:15 AM",
      status: "Incident",
      statusStyle: "bg-rose-50 text-rose-600 border-rose-200",
      icon: AlertTriangle,
      iconBg: "bg-rose-50 text-rose-600",
    },
    {
      id: 3,
      title: "Hydrochloric Acid",
      subtitle: "Restocked 12x 500mL Bottles",
      personnel: "Dr. Elena Rostova",
      timestamp: "08:30 AM",
      status: "Restocked",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Database,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      id: 4,
      title: "Autoclave Steam Sterilizer",
      subtitle: "Standard load sterilization schedule",
      personnel: "Researcher L. Clarke",
      timestamp: "08:00 AM",
      status: "Operational",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Calendar,
      iconBg: "bg-[#064e3b]/10 text-[#064e3b]",
    },
    {
      id: 5,
      title: "pH Buffer Solution Kit",
      subtitle: "Reagent lot 299 expiration critical",
      personnel: "System Monitor",
      timestamp: "Yesterday",
      status: "Expiring",
      statusStyle: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Database,
      iconBg: "bg-amber-50 text-amber-700",
    },
    {
      id: 6,
      title: "UV-Vis Spectrophotometer",
      subtitle: "Scheduled quarterly sensor calibration",
      personnel: "Maintenance Technician",
      timestamp: "Yesterday",
      status: "Maintenance",
      statusStyle: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Calendar,
      iconBg: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="p-6 max-w-350 mx-auto space-y-6 bg-[#f8faf9] min-h-screen font-sans">
      {/* filter bar and search bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setIsActiveTab(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                activeTab === cat
                  ? "bg-[#064e3b] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#064e3b] hover:bg-[#04382a] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all">
            <Plus className="w-4 h-4" />
            <span>Create Session</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/*Inventory Alerts */}
        <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              INVENTORY ALERTS
            </span>
            <span className="text-[9px] font-extrabold bg-emerald-900 text-white px-2 py-0.5 rounded-md tracking-wider">
              CRITICAL
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tight">
            14 Alerts
          </p>
          <p className="text-[11px] text-emerald-800 font-semibold mt-1">
            8 Depleting stock | 6 Near expiry
          </p>
        </div>

        {/* Damages & Losses */}
        <div className="bg-white border border-emerald-300 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              DAMAGES & LOSSES
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tight">
            3 Incidents
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            2 Apparatus breakages reported
          </p>
        </div>

        {/*Active Lab Sessions */}
        <div className="bg-[#10b981] text-white rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider">
              ACTIVE LAB SESSIONS
            </span>
          </div>
          <p className="text-3xl font-black tracking-tight">8 Active</p>
          <p className="text-[11px] text-emerald-100 font-medium mt-1">
            4 Chemistry | 3 Bio | 1 Physics
          </p>
        </div>

        {/*Equipment Status */}
        <div className="bg-[#04382a] text-white rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-wider">
              EQUIPMENT STATUS
            </span>
          </div>
          <p className="text-3xl font-black tracking-tight">42 / 3</p>
          <p className="text-[11px] text-emerald-200/80 font-medium mt-1">
            Operational vs Maintenance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* recent activity  */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Recent Lab Activity
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Live feed of bookings, incidents, and stock updates
              </p>
            </div>
            <button className="text-[11px] font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg transition-all">
              Show All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/50 rounded-xl px-2 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <span className="text-xs font-semibold text-slate-700 hidden sm:block w-32 truncate text-left">
                      {item.personnel}
                    </span>
                    <span className="text-[10px] text-slate-400 w-16 text-right hidden sm:block">
                      {item.timestamp}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${item.statusStyle}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* equipment   */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-sm font-bold text-slate-900">
              Equipment Utilization
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Operational capacity in current shift
            </p>
          </div>

          {/* Circular Gauge Placeholder Graphics */}
          <div className="flex justify-center my-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                {/* Outer ring */}
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#064e3b]"
                  strokeDasharray="88, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Inner ring */}
                <path
                  className="text-emerald-500"
                  strokeDasharray="70, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 6 a 12 12 0 0 1 0 24 a 12 12 0 0 1 0 -24"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-4 text-xs font-semibold">
            <div>
              <div className="flex justify-between text-slate-800 mb-1">
                <span>HPLC Spectrometer</span>
                <span className="font-bold text-[#064e3b]">88% Duty</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#064e3b] h-full rounded-full"
                  style={{ width: "88%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1">
                <span>Bench Centrifuges</span>
                <span className="font-bold text-emerald-600">14/20 Runs</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1">
                <span>High-Temp Incubator</span>
                <span className="font-bold text-emerald-700">
                  29 Hours Active
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-6">
          <button className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-[#064e3b] transition-all">
            <span>Optimize Allocation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
