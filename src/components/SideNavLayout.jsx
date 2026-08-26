import { Bell, CalendarCheck, FileSpreadsheet, FlaskConical, LayoutDashboard, PanelLeftClose, PanelLeftOpen, TestTube, User, Wrench, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideNavLayout({children, user, notifications = []}){
    const[isCollapsed, setIsCollapsed] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();

    const navItems = [
    {label: 'Dashboard', path: '/', icon: LayoutDashboard},
    {label: 'Lab Bookings', path: '/bookings', icon: CalendarCheck},
    {label: 'Experiments', path: '/experiments', icon: TestTube},
    {label: 'Results', path: '/results', icon: FileSpreadsheet},
    {label: 'Equipment Condition', path: '/equipment', icon: Wrench},
    {label: 'Profile', path: '/profile', icon: User},
    ];
    return(
        <div className="flex min-h-screen bg-[#f8faf9] text-slate-800">
            {/* navigation  */}
          <aside 
        className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between sticky top-0 h-screen z-40`}>
          
        {/* header and toggle */}
      <div>
          {/* Brand Header & Toggle */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#064e3b] flex items-center justify-center text-white shrink-0 shadow-sm">
                <FlaskConical className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <div className="truncate">
                  <span className="font-bold text-slate-900 text-sm tracking-tight block">
                    ASTA LABS
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Research Portal
                  </span>
                </div>
              )}
            </div>

              {/* side toggle  */}
              <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
            </div>

            {/* links */}

            <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-[#064e3b] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

            {/* footer  */}

         <div className="p-4 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
          {!isCollapsed ? 'ASTA LABS v2.4' : 'v2.4'}
        </div>
      </aside>

      {/* top header     */}

        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {navItems.find(item => item.path === location.pathname)?.label || 'Research Portal'}
          </div>

          <div className="flex items-center gap-4">
            
            {/* notifications  */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {/* Unread */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>

            <div className="h-4 w-px bg-slate-200"></div>

            {/* user tag  */}

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-900 leading-none mb-0.5">
                  {user?.displayName || 'User Account'}
                </p>
                <p className="text-[10px] text-slate-400 font-medium leading-none">
                  Student Account
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* main cont area */}
         <div className="flex-1 min-w-0">
        {children}
      </div>

     {/* notifications  */}
     {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* content   */}
      <aside className="relative w-full max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#064e3b]" />
                  <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* messages list  */}
              
           <div className="space-y-3">
                {notifications && notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs"
                    >
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{item.message}</p>
                      <span className="text-[10px] text-slate-400 mt-2 block">
                        {item.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
                    <p className="text-xs font-medium">No notifications yet</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Admin updates and alerts will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>   


          {/* footer actions   */}


      <div className="border-t border-slate-100 pt-4">
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
              >
                Close Panel
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
    </div>
  );
};