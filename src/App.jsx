import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SideNavLayout from './components/SideNavLayout'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register/>} /> 
        <Route path="/login" element={<Login/>} /> 

    </Routes> 
    </BrowserRouter>
  )
}

export default App
