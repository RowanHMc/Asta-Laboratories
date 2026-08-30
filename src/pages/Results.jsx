import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";



export default function Results(){
    const {userProfile} = useAuth();
    const navigate = useNavigate();
    const [experimentName, setExperimentName] = useState("");
    const [rows, setRows] = useState([
        {id:1, experiment:"", observation:"", conclusion:""}
    ]);
    const [saving, setSaving] = useState(false);

    const handleAddRow = () => {
        setRows((prev) => [
            ...prev, {id: Date.now(), experiment:"", observation:"", conclusion:""}
        ])
    }
    // delete
    const handleRemoveRow = (id) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
    }
    // edit
    const handleInputChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
//   save
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!experimentName.trim()) return;

    setSaving(true);
    try{
        await addDoc(collection(db, "experiment_results"), {
            title: experimentName,
            studentName: userProfile?.displayName  && userProfile?.email,
            entries: rows.map(({ experiment, observation, conclusion }) => ({
          experiment,
          observation,
          conclusion
        })),
        createdAt: serverTimestamp()
    })
    // back to expts
    navigate("/experiments");
} catch(err){
    console.error("failed to save", err);
}finally{
    setSaving(false);
}
}

return{

}
};
