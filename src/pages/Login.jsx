import { FlaskConical } from "lucide-react";
import React from "react";

export default function Login() {
  const [portalType, setPortalType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const isAdmin = portalType === "admin";

  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">

        {/* logo & name */}
               <div className="flex flex-col items-center mb-8">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md mb-3 transition-colors ${
                isAdmin ? "bg-[#04392b]" : "bg-[#064e3b]"
              }`}>
                <FlaskConical className="w-6 mt-4"/>
              </div> 
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              ASTA LABS
            </h1>
             <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
              {isAdmin ? "LMS Management Login" : "Student & Researcher Login"}
            </p>
            </div>
            {/* admin or student  */}

      </div>
    </div>
  );
}
