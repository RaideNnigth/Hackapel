import { useState } from "react";
import "../css/AdminAgendas.css";

export default function AdminAgendas() {
  const [filter, setFilter] = useState("todas");

  const [planilhas, setPlanilhas] = useState([
    {
      id: 1,
      hospital: "Hospital São Lucas",
      tipo: "consultas",
      enviadoEm: "27 de novembro de 2025",
      arquivo: "agenda_consultas_dezembro_2025.csv",
      periodo: "Dezembro 2025",
      registros: 245,
    },
    {
      id: 2,
      hospital: "Hospital Santa Maria",
      tipo: "exames",
      enviadoEm: "28 de novembro de 2025",
      arquivo: "agenda_exames_dezembro_2025.csv",
      periodo: "Dezembro 2025",
      registros: 189,
    },
  ]);

  function handleConfirmar(id) {
    setPlanilhas(prev => prev.filter(p => p.id !== id));
  }

  function handleDownload(nomeArquivo) {
    alert("Baixando arquivo: " + nomeArquivo);
  }

  const filtradas =
    filter === "todas"
      ? planilhas
      : planilhas.filter(p => p.tipo === filter);

  return (
    <div className="container">
      <h2>Painel do Administrador</h2>
      <p>Gerencie as agendas enviadas pelos hospitais</p>

      <div className="cards-row">
        <div className="card">
          <h3>Total de Planilhas</h3>
          <p>{planilhas.length}</p>
        </div>

        <div className="card">
          <h3>Consultas</h3>
          <p>{planilhas.filter(p => p.tipo === "consultas").length}</p>
        </div>

        <div className="card">
          <h3>Exames</h3>
          <p>{planilhas.filter(p => p.tipo === "exames").length}</p>
        </div>
      </div>

      <div className="filter-buttons">
        <button
          className={filter === "todas" ? "active" : ""}
          onClick={() => setFilter("todas")}
        >
          Todas
        </button>
        <button
          className={filter === "consultas" ? "active" : ""}
          onClick={() => setFilter("consultas")}
        >
          Consultas
        </button>
        <button
          className={filter === "exames" ? "active" : ""}
          onClick={() => setFilter("exames")}
        >
          Exames
        </button>
      </div>

      <div className="lista">
        {filtradas.map(p => (
          <div key={p.id} className="item">
            <div className="topo">
              <div>
                <strong>{p.hospital}</strong>
                <span className="tag">{p.tipo}</span>
              </div>
              <small>Enviado em {p.enviadoEm}</small>
            </div>

            <div className="conteudo">
              <div>
                <p><strong>{p.arquivo}</strong></p>
                <p className="cinza">{p.periodo}</p>
              </div>

              <div>
                <p><strong>{p.registros}</strong> registros</p>
              </div>
            </div>

            <div className="acoes">
              <button onClick={() => handleDownload(p.arquivo)}>
                Baixar Planilha
              </button>

              <button
                className="confirmar"
                onClick={() => handleConfirmar(p.id)}
              >
                Confirmar
              </button>
            </div>
          </div>
        ))}

        {filtradas.length === 0 && (
          <p className="vazio">Nenhuma planilha disponível.</p>
        )}
      </div>
    </div>
  );
}
