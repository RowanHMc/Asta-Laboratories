import { CalendarCheck, FileSpreadsheet, LayoutDashboard, TestTube, User, Wrench } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideNavLayout({children, user}){
    const[isCollapsed, setIsCollapsed] =useState(false);
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

    );

};