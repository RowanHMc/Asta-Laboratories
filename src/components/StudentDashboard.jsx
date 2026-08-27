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


};