import { useState } from "react";
import axios from "axios";

export default function AdminMedicos() {
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");

  async function cadastrar() {
    await axios.post("http://localhost:3000/admin/medicos", {
      nome,
      crm
    });
    alert("Médico cadastrado!");
  }

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Cadastrar Médico</h1>

      <div className="flex flex-col w-80 gap-3">
        <input className="border p-2" placeholder="Nome" onChange={e => setNome(e.target.value)} />
        <input className="border p-2" placeholder="CRM" onChange={e => setCrm(e.target.value)} />
        
        <button className="bg-green-600 text-white p-2 rounded" onClick={cadastrar}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}
