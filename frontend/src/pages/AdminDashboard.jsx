import { useState } from "react";
import "../css/AdminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ubsData = [
  {
    id: 1,
    nome: "UBS Vila Nova",
    endereco: "Rua das Flores, 123",
    telefone: "(11) 3456-7890",
    responsavel: "Dr. João Silva",
  },
  {
    id: 2,
    nome: "UBS Centro",
    endereco: "Av. Principal, 456",
    telefone: "(11) 3456-7891",
    responsavel: "Dra. Maria Santos",
  },
];

const hospitaisData = [
  {
    id: 1,
    nome: "Hospital São Paulo",
    tipo: "Hospital",
    endereco: "Av. Paulista, 1000",
    telefone: "(11) 3000-0000",
    especialidades: "Cardiologia, Neurologia, Ortopedia",
  },
  {
    id: 2,
    nome: "Laboratório Vida",
    tipo: "Laboratório",
    endereco: "Rua da Saúde, 200",
    telefone: "(11) 3111-1111",
    especialidades: "Análises Clínicas, Exames de Imagem",
  },
];

const oficiaisData = [
  {
    id: 1,
    nome: "Carlos Oliveira",
    cargo: "Coordenador Administrativo",
    email: "carlos.oliveira@saude.gov.br",
    telefone: "(11) 3222-2222",
    setor: "Gestão de UBS",
  },
  {
    id: 2,
    nome: "Ana Paula Costa",
    cargo: "Analista de Dados",
    email: "ana.costa@saude.gov.br",
    telefone: "(11) 3222-2223",
    setor: "Monitoramento e Avaliação",
  },
];

const kpiCards = [
  {
    titulo: "Total de Atendimentos",
    valor: "18.700",
    subtitulo: "+12.5% em relação ao mês anterior",
  },
  {
    titulo: "Pacientes Ativos",
    valor: "12.450",
    subtitulo: "+8.2% em relação ao mês anterior",
  },
  {
    titulo: "Unidades Ativas",
    valor: "24",
    subtitulo: "8 UBS, 10 Hospitais, 6 Laboratórios",
  },
  {
    titulo: "Taxa de Satisfação",
    valor: "87%",
    subtitulo: "+3.1% em relação ao mês anterior",
  },
];

const atendimentosMensais = [
  { mes: "Jan", total: 2500, consultas: 1800, exames: 700 },
  { mes: "Fev", total: 2700, consultas: 1950, exames: 750 },
  { mes: "Mar", total: 3000, consultas: 2100, exames: 800 },
  { mes: "Abr", total: 2850, consultas: 2000, exames: 850 },
  { mes: "Mai", total: 3200, consultas: 2300, exames: 900 },
  { mes: "Jun", total: 3500, consultas: 2500, exames: 950 },
];

export default function AdminDashboard() {
  const [mainTab, setMainTab] = useState("administrativo");
  const [adminTab, setAdminTab] = useState("ubs");
  const [kpiTab, setKpiTab] = useState("atendimentos");

  return (
    <div className="dash-root">
      <header className="dash-header">
        <h1>Painel Administrativo - Sistema de Saúde</h1>
        <p>Gestão e monitoramento de unidades de saúde</p>

        <div className="dash-main-tabs">
          <button
            className={`dash-main-tab ${
              mainTab === "administrativo" ? "active" : ""
            }`}
            onClick={() => setMainTab("administrativo")}
          >
            <span className="tab-icon">⚙️</span>
            Gestão Administrativa
          </button>
          <button
            className={`dash-main-tab ${mainTab === "kpis" ? "active" : ""}`}
            onClick={() => setMainTab("kpis")}
          >
            <span className="tab-icon">📊</span>
            KPIs
          </button>
        </div>
      </header>

      <main className="dash-content">
        {mainTab === "administrativo" ? (
          <section className="card">
            <div className="card-header">
              <div>
                <h2>Gestão Administrativa</h2>
                <p>
                  Cadastre e gerencie UBS, Hospitais, Laboratórios e Oficiais
                  Administrativos
                </p>
              </div>
            </div>

            <div className="sub-tabs-row">
              <div className="sub-tabs">
                <button
                  className={`sub-tab ${adminTab === "ubs" ? "active" : ""}`}
                  onClick={() => setAdminTab("ubs")}
                >
                  <span className="tab-icon">🏢</span> UBS
                </button>
                <button
                  className={`sub-tab ${
                    adminTab === "hospitais" ? "active" : ""
                  }`}
                  onClick={() => setAdminTab("hospitais")}
                >
                  <span className="tab-icon">🏥</span> Hospitais/Laboratórios
                </button>
                <button
                  className={`sub-tab ${
                    adminTab === "oficiais" ? "active" : ""
                  }`}
                  onClick={() => setAdminTab("oficiais")}
                >
                  <span className="tab-icon">👥</span> Oficiais Administrativos
                </button>
              </div>

              <button className="primary-btn">
                +
                <span>
                  {adminTab === "ubs" && "Cadastrar UBS"}
                  {adminTab === "hospitais" && "Cadastrar Hospital/Laboratório"}
                  {adminTab === "oficiais" &&
                    "Cadastrar Oficial Administrativo"}
                </span>
              </button>
            </div>

            {adminTab === "ubs" && (
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Endereço</th>
                    <th>Telefone</th>
                    <th>Responsável</th>
                    <th className="col-acoes">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {ubsData.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nome}</td>
                      <td>{u.endereco}</td>
                      <td>{u.telefone}</td>
                      <td>{u.responsavel}</td>
                      <td className="col-acoes">
                        <button className="delete-btn">🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {adminTab === "hospitais" && (
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Endereço</th>
                    <th>Telefone</th>
                    <th>Especialidades</th>
                    <th className="col-acoes">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitaisData.map((h) => (
                    <tr key={h.id}>
                      <td>{h.nome}</td>
                      <td>{h.tipo}</td>
                      <td>{h.endereco}</td>
                      <td>{h.telefone}</td>
                      <td>{h.especialidades}</td>
                      <td className="col-acoes">
                        <button className="delete-btn">🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {adminTab === "oficiais" && (
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Setor</th>
                    <th className="col-acoes">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {oficiaisData.map((o) => (
                    <tr key={o.id}>
                      <td>{o.nome}</td>
                      <td>{o.cargo}</td>
                      <td>{o.email}</td>
                      <td>{o.telefone}</td>
                      <td>{o.setor}</td>
                      <td className="col-acoes">
                        <button className="delete-btn">🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        ) : (
          <section className="card">
            <div className="card-header">
              <div>
                <h2>Indicadores-Chave de Desempenho (KPI)</h2>
                <p>
                  Monitore os principais indicadores de desempenho do sistema de
                  saúde
                </p>
              </div>
            </div>

            <div className="kpi-cards">
              {kpiCards.map((k) => (
                <div key={k.titulo} className="kpi-card">
                  <div className="kpi-title-row">
                    <span className="kpi-title">{k.titulo}</span>
                    <span className="kpi-mini-icon">↗</span>
                  </div>
                  <div className="kpi-value">{k.valor}</div>
                  <div className="kpi-subtitle">{k.subtitulo}</div>
                </div>
              ))}
            </div>

            <div className="sub-tabs-row kpi-tabs-row">
              <div className="sub-tabs">
                <button
                  className={`sub-tab ${
                    kpiTab === "atendimentos" ? "active" : ""
                  }`}
                  onClick={() => setKpiTab("atendimentos")}
                >
                  Atendimentos
                </button>
                <button
                  className={`sub-tab ${
                    kpiTab === "distribuicao" ? "active" : ""
                  }`}
                  onClick={() => setKpiTab("distribuicao")}
                >
                  Distribuição
                </button>
                <button
                  className={`sub-tab ${kpiTab === "ocupacao" ? "active" : ""}`}
                  onClick={() => setKpiTab("ocupacao")}
                >
                  Ocupação
                </button>
                <button
                  className={`sub-tab ${kpiTab === "espera" ? "active" : ""}`}
                  onClick={() => setKpiTab("espera")}
                >
                  Tempo de Espera
                </button>
              </div>
            </div>

            {/* Por enquanto, o gráfico é igual para todos os sub-tabs.
                Você pode mudar os dados conforme o tab depois. */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Atendimentos Mensais</h3>
                <p>
                  Evolução dos atendimentos, consultas e exames nos últimos 6
                  meses
                </p>
              </div>

              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={atendimentosMensais}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {/* TOTAL DE ATENDIMENTOS – Laranja */}
                    <Bar
                      dataKey="total"
                      name="Total de Atendimentos"
                      fill="#F59E0B" /* Laranja */
                      radius={[4, 4, 0, 0]}
                    />

                    {/* CONSULTAS – Azul */}
                    <Bar
                      dataKey="consultas"
                      name="Consultas"
                      fill="#3B82F6" /* Azul */
                      radius={[4, 4, 0, 0]}
                    />

                    {/* EXAMES – Verde */}
                    <Bar
                      dataKey="exames"
                      name="Exames"
                      fill="#10B981" /* Verde */
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
