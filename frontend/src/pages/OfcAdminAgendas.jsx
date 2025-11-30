import React, { useState, useEffect } from "react";
import { 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  ShieldCheck, 
  Loader2,
  FileText,
  ArrowLeft // Added this import
} from "lucide-react";
import api from "../api_helper";

export default function OfcAdminAgendas() {
  const [planilha, setPlanilha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanilha = async () => {
      try {
        setLoading(true);
        const dataFromBackend = await api.get("/api/hospital-journals");
        
        let p = {
          data: dataFromBackend.data,
          registros: dataFromBackend.data.length,
          arquivo: "agenda_pelosus.csv",
          dataGeracao: new Date().toLocaleDateString('pt-BR')
        }

        setPlanilha(p);
      } catch (error) {
        console.error("Erro ao buscar planilha:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanilha();
  }, []);

  function handleDownload(nomeArquivo) {
    if (!planilha || !planilha.data) return;

    const header = [
      "Prestador",
      "Endereço",
      "Especialidade Consulta/Exame",
      "Data",
      "Horário",
      "Nome do Profissional"
    ].join(",");

    const lines = planilha.data.map(r => [
      r.prestador,
      r.endereco,
      r.especialidade,
      r.data,
      r.horario,
      r.nome_profissional
    ].join(","));

    const csvContent = [header, ...lines].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-medium">Carregando dados do sistema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Top Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Painel do Oficial Administrador</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">PeloSUS • GESTÃO DE AGENDAS</p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        
        <div className="mb-8 pl-2 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-slate-800">Exportação de Agendas</h2>
          <p className="text-slate-500 mt-1">
            Visualize e faça o download das agendas de consultas e exames enviadas pelos prestadores.
          </p>
        </div>

        {planilha ? (
          /* Card Component for the File */
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              
              {/* Icon Section */}
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-green-100">
                <FileSpreadsheet className="w-8 h-8 text-green-600" />
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-slate-800">
                    Relatório Geral de Consultas
                  </h3>
                  {/* "Novo" badge removed from here */}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Gerado em: {planilha.dataGeracao}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>{planilha.registros} horários disponíveis</span>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="w-full md:w-auto mt-2 md:mt-0">
                <button 
                  onClick={() => handleDownload(planilha.arquivo)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  Baixar Planilha (.csv)
                </button>
                <p className="text-center md:text-right text-xs text-slate-400 mt-2">
                  Formato CSV compatível com Excel
                </p>
              </div>

            </div>
            
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-green-400"></div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Nenhuma agenda pendente</h3>
            <p className="text-slate-500 max-w-sm mt-2">
              Não há novos registros de agenda para exportação no momento. Tente novamente mais tarde.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}