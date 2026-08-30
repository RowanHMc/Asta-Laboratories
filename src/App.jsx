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
        <Routes>
          {/* Public — Home is reachable by anyone and never shows the sidebar */}
          <Route path="/" element={<Home />} />

          {/* Public-only — logged-in users are bounced to their dashboard */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />

          {/* Authenticated — any signed-in role, wrapped in the sidebar shell */}
          <Route element={<ProtectedRoute notifications={notifications} />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/bookings" element={<LabBookings />} />
            <Route path="/experiments" element={<Experiments />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/equipment" element={<EquipmentCondition />} />
          </Route>

          {/* admin only */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} notifications={notifications} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Anything else falls back to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;