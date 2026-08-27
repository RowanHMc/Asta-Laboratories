import { AlertTriangle, Calendar, Database } from "lucide-react";
import React, { useState } from "react";

export default function AdminDashboard(){
    const[activeTab, setIsActive] = useState('All');
    const categories = ['All', 'Chemistry', 'Biology','physics'];

    const recentActivity = [
       {
      id: 1,
      title: 'Leica DM2500 Microsc...',
      subtitle: 'Optics & alignment calibration',
      personnel: 'Prof. M. Sterling',
      timestamp: '10:42 AM',
      status: 'Active',
      statusStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Calendar,
      iconBg: 'bg-[#064e3b]/10 text-[#064e3b]'
    },
    {
      id: 2,
      title: 'Centrifuge  (Bench...',
      subtitle: 'Overheating warning',
      personnel: 'Dr. Alan Vance',
      timestamp: '09:15 AM',
      status: 'Incident',
      statusStyle: 'bg-rose-50 text-rose-600 border-rose-200',
      icon: AlertTriangle,
      iconBg: 'bg-rose-50 text-rose-600'
    },
    {
      id: 3,
      title: 'Hydrochloric Acid',
      subtitle: 'Restocked 12x 500mL Bottles',
      personnel: 'Dr. Elena Rostova',
      timestamp: '08:30 AM',
      status: 'Restocked',
      statusStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Database,
      iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 4,
      title: 'Autoclave Steam Sterilizer',
      subtitle: 'Standard load sterilization schedule',
      personnel: 'Researcher L. Clarke',
      timestamp: '08:00 AM',
      status: 'Operational',
      statusStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Calendar,
      iconBg: 'bg-[#064e3b]/10 text-[#064e3b]'
    },
    {
      id: 5,
      title: 'pH Buffer Solution Kit',
      subtitle: 'Reagent lot 299 expiration critical',
      personnel: 'System Monitor',
      timestamp: 'Yesterday',
      status: 'Expiring',
      statusStyle: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Database,
      iconBg: 'bg-amber-50 text-amber-700'
    },
    {
      id: 6,
      title: 'UV-Vis Spectrophotometer',
      subtitle: 'Scheduled quarterly sensor calibration',
      personnel: 'Maintenance Technician',
      timestamp: 'Yesterday',
      status: 'Maintenance',
      statusStyle: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Calendar,
      iconBg: 'bg-amber-50 text-amber-700'
    } 
    ];

    return(
        <div className="p-6 max-w-350 mx-auto space-y-6 bg-[#f8faf9] min-h-screen font-sans">
            {/* filter bar and search bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                activeTab === cat
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
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
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">INVENTORY ALERTS</span>
            <span className="text-[9px] font-extrabold bg-emerald-900 text-white px-2 py-0.5 rounded-md tracking-wider">
              CRITICAL
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tight">14 Alerts</p>
          <p className="text-[11px] text-emerald-800 font-semibold mt-1">
            8 Depleting stock | 6 Near expiry
          </p>
        </div>

        {/* Damages & Losses */}
        <div className="bg-white border border-emerald-300 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DAMAGES & LOSSES</span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tight">3 Incidents</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            2 Apparatus breakages reported
          </p>
        </div>

        {/*Active Lab Sessions */}
        <div className="bg-[#10b981] text-white rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider">ACTIVE LAB SESSIONS</span>
          </div>
          <p className="text-3xl font-black tracking-tight">8 Active</p>
          <p className="text-[11px] text-emerald-100 font-medium mt-1">
            4 Chemistry | 3 Bio | 1 Physics
          </p>
        </div>

        {/*Equipment Status */}
        <div className="bg-[#04382a] text-white rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-wider">EQUIPMENT STATUS</span>
          </div>
          <p className="text-3xl font-black tracking-tight">42 / 3</p>
          <p className="text-[11px] text-emerald-200/80 font-medium mt-1">
            Operational vs Maintenance
          </p>
        </div>

      </div>

        </div>
    );
};