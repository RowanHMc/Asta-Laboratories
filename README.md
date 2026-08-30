# ASTA LABORATORIES. 
An all in one lab system.

## PROJECT BRIEF
Managing physical laboratory space, equipment access, and experiment schedules manually has oftenlead to overlooked sessions, poor management, and difficult tracking of sessions.

Asta Labs Management System addresses these issues by delivering a centralized, role-governed web. It provides access control for equipment, tracks lab availability, manages student experiment workflows, and isolates administrative capabilities to authorized users—ensuring smooth operational workflows for educational and research labs.

## TECH USED 
* React
* React Router
* FireBase
* TailwindCss
* Vs Code

## PROJECT STRUCTURE
Asta-Labs/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicOnlyRoute.jsx
│   │   └── SideNavLayout.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── EquipmentControl.jsx
│   │   ├── Experiments.jsx
│   │   ├── Home.jsx
│   │   ├── LabBookings.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Results.jsx
│   │   └── StudentDashboard.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
└── package.json

## POWERPOINT LINK
https://1drv.ms/p/c/8861886c4d95b6cd/IQCgT-GWwgefRZqPg4NxYooeAaUxPjaRVeodHC3xBnj2eSc?e=Dk755o



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

