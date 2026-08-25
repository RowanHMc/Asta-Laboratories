import { useState } from "react";
import { ArrowRight, ChevronDown, Eye, EyeOff, FlaskConical, LayoutDashboard, Lock, Mail, Shield } from "lucide-react";


export default function Login() {
  const [portalType, setPortalType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const{name, value, type, checked} = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const handleSubmit = (e) => {
    e.prevenrDefault();
    console.log(`[${portalType.toUpperCase()}LOGIN]`), formData;
  }

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
              <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Portal Type
          </label>
          <div className="relative">
            {isAdmin ? (
              <Shield className="w-4 h-4 text-[#064e3b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            ) : (
              <LayoutDashboard className="w-4 h-4 text-[#064e3b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
           <select
              value={portalType}
              onChange={(e) => setPortalType(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm font-semibold bg-[#f8faf9] border border-slate-200 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="student">Student Portal</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div> 
          {/* form  */}
          <form onSubmit={handleSubmit} className=" space-y-4">
            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {isAdmin ? "Admin Email": "Academic Email"}
                </label>
                <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"/>
                    <input
                    type="email"
                    name="email"
                    required
                    placeholder={
                        isAdmin
                             ? "e.name@astalabs.org"
                            : "s.mku@university.edu"}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f8faf9] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] focus:border-transparent transition-all"
                      />                 
                </div>
                </div>
                {/* password  */}
                        <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={8}
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#f8faf9] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064e3b] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-500">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-[#064e3b] focus:ring-[#064e3b]"
                />
                Remember Me
              </label>
              <a
                href="#forgot"
                className="font-semibold text-[#064e3b] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 bg-[#064e3b] hover:bg-[#04392b] text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>
                {isAdmin ? "Sign In to Console" : "Sign In to Portal"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
          </form>
          {/* footer link  */}
          <div className="mt-8 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <a
              href="#register"
              className="font-semibold text-[#064e3b] hover:underline"
            >
              Create Account
            </a>
          </div>
      </div>
    </div>
    </div>
  );
}
