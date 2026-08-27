import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SideNavLayout from './components/SideNavLayout'
import LabBookings from './pages/LabBookings'
import Experiments from './pages/Experiments'
import Results from './pages/Results'
import Profile from './pages/Profile'
import EquipmentCondition from './pages/EquipmentCondition'
import Home from './pages/Home'

function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

useEffect(() => {

}), [setNotifications]

  return (
    <BrowserRouter>
    <SideNavLayout user={user} notifications={notifications}>
    <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register/>} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/bookings" element={<LabBookings/>} /> 
        <Route path="/experiments" element={<Experiments/>} /> 
        <Route path="/results" element={<Results/>} /> 
        <Route path="/profile" element={<Profile/>} /> 
        <Route path="/equipment" element={<EquipmentCondition/>} /> 

    </Routes>
    </SideNavLayout> 
    </BrowserRouter>
  )
}

export default App
