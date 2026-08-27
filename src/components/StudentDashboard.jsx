import { AlertTriangle, Atom, Droplet, TestTube2 } from "lucide-react";
import React from "react";

export default function StudentDashboard(){

    const recentActivities = [{
        id: 1,
        title: 'E.Coli Cultivation Study',
        subtitle: 'Inoculation of plates',
        section: 'Microbio lab', 
        time: '2 Hours Ago',
        status: 'In progress',
        statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: TestTube2,
        iconBg:'bg-emerald-50 text-emerald-600'
    }, {
        id: 2,
        title: 'Spectrophotomety session',
        subtitle: 'Mass spectroscopy',
        section: 'Chem lab',
        time: '2 Hours Ago',
        status: 'In progress',
        statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Atom,
        iconBg:'bg-emerald-50 text-emerald-600'
    }, {
        id: 3,
        title: 'Organosynthesis',
        subtitle: 'Terprne synthesis',
        setion: 'Chem Lab',
        time: '16 Hours Ago',
        status: 'Completed',
        statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Droplet,
        iconBg:'bg-emerald-50 text-emerald-600'        
    }, {
        id: 4,
        title: 'Equipment report',
        subtitle: 'Faulty Microscope',
        section: 'Bota Lab 3',
        time: '4 Days ago',
        status: 'Reported',
        statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: AlertTriangle,
        iconBg:'bg-emerald-50 text-emerald-600'
    }
];

const upcomingSchedule = [{
      id: 1,
      month: "OCT",
      day: "18",
      title: "Microbio Report Due",
      subtitle: "Submission box closes at 11:59 PM",
      tag: "ACADEMIC",
      tagColor: "bg-rose-50 text-rose-600"
},{
    id: 2,
      month: "OCT",
      day: "19",
      title: "Lab Practical 3 Session",
      subtitle: "02:00 PM - 05:00 PM • Room 302B",
      tag: "BOOKING",
      tagColor: "bg-emerald-50 text-emerald-700" 
}
];

return(
    <div className="p-6 max-w-350 mx-auto space-y-6 bg-[#f8faf9] min-h-screen">
{/* action cards  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* book  */}
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#064e3b] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Book Lab Session</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Reserve slots for microscopes, incubators, or hoods
              </p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-700 transition-all">
            New Booking
          </button>
        </div>

        {/* data entry */}
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#064e3b] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Submit Data Entry</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Log experimental logs or reagent consumption
              </p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-700 transition-all">
            Log Observations
          </button>
        </div>

{/* incidents  */}
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Report Incident</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                File apparatus breakage, spills, or safety hazards
              </p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-700 transition-all">
            Report Now
          </button>
        </div>
        </div>

        {/* metrics cards  */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* upcoming session */}
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">UPCOMING BOOKINGS</span>
            <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md tracking-wider">
              CONFIRMED
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">Room 302B</p>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">
            Tomorrow at 2:00 PM — Microbiology Lab
          </p>
        </div>
    {/* active sessions */}
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE EXPERIMENTS</span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">2 In Progress</p>
          <p className="text-[11px] text-slate-400 mt-1 font-medium truncate">
            E. Coli Cultivation & Organic Synthesis
          </p>
        </div>
    {/* pending reports  */}
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PENDING REPORTS</span>
            <span className="text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md tracking-wider">
              URGENT
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">1 Report Due</p>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">
            Biology Practical 4 — Due in 2 days
          </p>
        </div>

{/* equioment report  */}

<div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EQUIPMENT</span>
            <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md tracking-wider">
              Broken
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">3 Items</p>
          <p className="text-[11px] text-slate-400 mt-1 font-medium truncate">
           Centrifuge
          </p>
        </div>
    </div>

    {/* spit view */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* recent activity  */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Your Recent Lab Activities</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Live tracking of your experiment check-ins, bookings, and submissions
                </p>
              </div>
              <button className="text-[10px] font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg transition-all">
                Filter: 7 Days
              </button>
            </div>
            </div>
            

         {/* activity list     */}

         <div className="divide-y divide-slate-100">
              {recentActivities.map((act) => {
                const IconComponent = act.icon;
                return (
                  <div key={act.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${act.iconBg}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 truncate">{act.title}</p>
                        <p className="text-[10px] text-slate-400 truncate">{act.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="hidden sm:block text-right">
                        <p className="text-xs font-semibold text-slate-700">{act.section}</p>
                        <p className="text-[10px] text-slate-400">{act.elapsed}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${act.statusColor}`}>
                        {act.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </div>


    </div>
);

};