import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Save,
  Send,
  Trash2,
  Table as TableIcon,
  User // Added User icon for the greeting
} from "lucide-react";
import api from "../api_helper";

export default function PlanilhaGercon() {
  const [userName, setUserName] = useState("");
  const [rows, setRows] = useState([
    { prestador: "", endereco: "", especialidade: "", data: "", horario: "", profissional: "" }
  ]);

  // Load user name on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        // Assuming 'user' is stored as a JSON string
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.full_name || "Usuário");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      setUserName("Usuário");
    }
  }, []);

  const addRow = () => {
    setRows([
      ...rows,
      { prestador: "", endereco: "", especialidade: "", data: "", horario: "", profissional: "" }
    ]);
  };

  const removeRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const updateCell = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const exportAndSaveSheet = () => {
    const header = [
      "Prestador",
      "Endereço",
      "Especialidade Consulta/Exame",
      "Data",
      "Horário",
      "Nome do Profissional"
    ].join(",");

    let objsToSave = [];
    const lines = rows.map(r => {
      objsToSave.push({
        prestador: r.prestador,
        endereco: r.endereco,
        especialidade: r.especialidade,
        data: r.data,
        horario: r.horario,
        nome_profissional: r.profissional
      });

      return [
        r.prestador,
        r.endereco,
        r.especialidade,
        r.data,
        r.horario,
        r.profissional
      ].join(",")
    });

    api.post("/api/hospital-journals", objsToSave)
      .then(() => alert("Planilha salva no sistema com sucesso!"))
      .catch(err => console.error("Erro ao salvar", err));

    const csvContent = [header, ...lines].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "gercon.csv";
    a.click();
  };

  const exportToGercon = () => {
    api.post(
      "http://127.0.0.1:5000/integracao/agendas/consumirExterno",
      rows,
      {
        headers: {
          "X-API-Key": "hackapel2024",
          "usuario": "hackapel",
          "senha": "Hackapel@2024",
          "cnes": "1234567",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        alert("Sucesso! " + response.data.mensagem);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar para o GERCON. Verifique o console.");
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <TableIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Editor de Agenda GERCON</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Integração Externa</p>
            </div>
          </div>

          {/* User Greeting Section - Pushed to right with ml-auto */}
          <div className="ml-auto hidden md:flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-slate-700">Olá, {userName}!</p>
              <p className="text-xs text-slate-400">Oficial Administrador</p>
            </div>
            <div className="bg-slate-100 p-2 rounded-full">
              <User className="w-5 h-5 text-slate-500" />
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                  <th className="p-4 min-w-[200px]">Prestador</th>
                  <th className="p-4 min-w-[250px]">Endereço</th>
                  <th className="p-4 min-w-[200px]">Especialidade</th>
                  <th className="p-4 w-[140px]">Data</th>
                  <th className="p-4 w-[120px]">Horário</th>
                  <th className="p-4 min-w-[200px]">Profissional</th>
                  <th className="p-4 w-[50px]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-2">
                      <input
                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-orange-500 focus:ring-0 text-slate-700 text-sm py-2 px-1 transition-all placeholder-slate-300"
                        placeholder="Nome do local"
                        value={row.prestador}
                        onChange={e => updateCell(idx, "prestador", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-orange-500 focus:ring-0 text-slate-700 text-sm py-2 px-1 transition-all placeholder-slate-300"
                        placeholder="Endereço completo"
                        value={row.endereco}
                        onChange={e => updateCell(idx, "endereco", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-orange-500 focus:ring-0 text-slate-700 text-sm py-2 px-1 transition-all placeholder-slate-300"
                        placeholder="Ex: Cardiologia"
                        value={row.especialidade}
                        onChange={e => updateCell(idx, "especialidade", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-orange-500 focus:ring-0 text-slate-700 text-sm py-2 px-1 transition-all"
                        value={row.data}
                        onChange={e => updateCell(idx, "data", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="time"
                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-orange-500 focus:ring-0 text-slate-700 text-sm py-2 px-1 transition-all"
                        value={row.horario}
                        onChange={e => updateCell(idx, "horario", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-orange-500 focus:ring-0 text-slate-700 text-sm py-2 px-1 transition-all placeholder-slate-300"
                        placeholder="Nome do médico"
                        value={row.profissional}
                        onChange={e => updateCell(idx, "profissional", e.target.value)}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => removeRow(idx)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100"
                        title="Remover linha"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Button Area */}
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <button
              onClick={addRow}
              className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Adicionar nova linha
            </button>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="mt-6 flex flex-col md:flex-row justify-end gap-4">
          <button
            onClick={exportAndSaveSheet}
            className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 font-medium px-6 py-3 rounded-lg transition-all shadow-sm"
          >
            <Save className="w-4 h-4" />
            Salvar e Baixar CSV
          </button>

          <button
            onClick={exportToGercon}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4" />
            Enviar para GERCON
          </button>
        </div>

      </main>
    </div>
  );
}