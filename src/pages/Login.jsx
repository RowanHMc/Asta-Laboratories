import React from "react";

export default function Login(){
const [portalType, setPortalType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const isAdmin = portalType ==='admin';

  
};