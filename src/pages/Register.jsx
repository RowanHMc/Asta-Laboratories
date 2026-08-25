import React, { useState } from "react";
import { FlaskConical } from "lucide-react";

export default function Register(){
    const [formData, setFormData] = useState({
        fullName : "",
        email: "",
        password: "",
        confirmPassword: "", 

    })
    const [showPassword, setShowPassword] = useState(false);

    return(
        <div>
            
        </div>
    );
};