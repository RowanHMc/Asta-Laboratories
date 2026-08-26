import React from "react";
import { Link } from "react-router-dom";
import { FlaskConical } from "lucide-react";

export default function Dashboard() {
  return (
   
    <div className="min-h-screen bg-[#f8faf9] font-sans text-slate-800">
      {/* header  */}
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-center sm:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#064e3b] flex items-center justify-center text-white shadow-sm">
            <FlaskConical className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            ASTA LABS
          </span>
        </div>
      </header>
      {/* hero  */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064e3b]/10 text-[#064e3b] text-xs font-semibold mb-4">
            <span>Next-Gen Research Platform</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Advanced Laboratory & Sample Management
          </h1>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            ASTA LABS provides researchers and academic institutions with
            precise tracking tools, real-time data integration, and secure
            portal access for laboratory operations.
          </p>
          {/* cta  */}
          <div className="flex justify-center">
            <Link
              to="/login"
              className="px-8 py-3.5 bg-[#064e3b] hover:bg-[#04392b] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#064e3b]/10 text-[#064e3b] flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Sample Tracking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Catalog, organize, and track specimen inventories with real-time
              audit logs and chain of custody tracking.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#064e3b]/10 text-[#064e3b] flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">
              Analytics and Reports
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generate experimental reports, output data visualizers, and export
              metrics seamlessly.{" "}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#064e3b]/10 text-[#064e3b] flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Portal Access</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Role-based access to the portals designed for students and their
              technicians.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
