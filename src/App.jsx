import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import SideNavLayout from './components/SideNavLayout'
import LabBookings from './pages/LabBookings'
import Experiments from './pages/Experiments'
import Results from './pages/Results'
import Profile from './pages/Profile'
import EquipmentCondition from './pages/EquipmentCondition'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import { AuthProvider } from './context/AuthContext'

function App() {

  const [notifications] = useState([]);


  return (
    <BrowserRouter>
    <AuthProvider>
    <SideNavLayout user={user} notifications={notifications}>
    <Routes>

        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/bookings" element={<LabBookings/>} /> 
        <Route path="/experiments" element={<Experiments/>} /> 
        <Route path="/results" element={<Results/>} /> 
        <Route path="/profile" element={<Profile/>} /> 
        <Route path="/equipment" element={<EquipmentCondition/>} /> 

    </Routes>
    </SideNavLayout> 
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
