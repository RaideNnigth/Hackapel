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
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- DADOS FICTÍCIOS BASEADOS EM PELOTAS/RS ---

// 1. Hospitais/Laboratórios que mais fornecem vagas (Top 5)
const vacanciesData = [
  { name: "Hosp. Escola UFPel", vagas: 1250 },
  { name: "Santa Casa Pelotas", vagas: 980 },
  { name: "Hosp. Beneficência", vagas: 850 },
  { name: "Lab. Exame Sul", vagas: 600 },
  { name: "UBS Fragata", vagas: 450 },
];

// 2. Status das Consultas (Para ver abstensão)
const appointmentStatusData = [
  { name: "Realizadas", value: 6500 },
  { name: "Canceladas (Prévio)", value: 1200 },
  { name: "Absenteísmo (Faltas)", value: 2100 }, // Faltou sem avisar
];

// Cores para o gráfico de pizza
const COLORS_STATUS = ["#10B981", "#F59E0B", "#EF4444"]; // Verde, Laranja, Vermelho

// 3. Demografia de QUEM FALTOU (Absenteísmo)
// 3a. Gênero
const absenteeGenderData = [
  { name: "Mulheres", value: 62 },
  { name: "Homens", value: 38 },
];
// 3b. Faixa Etária
const absenteeAgeData = [
  { name: "0-18", value: 10 },
  { name: "19-39", value: 45 }, // Jovens adultos/trabalhadores (maior taxa fictícia)
  { name: "40-59", value: 25 },
  { name: "60+", value: 20 },
];
// 3c. Bairros de Pelotas
const absenteeNeighborhoodData = [
  { name: "Fragata", value: 35 },
  { name: "Três Vendas", value: 25 },
  { name: "Areal", value: 20 },
  { name: "Centro", value: 15 },
  { name: "Laranjal", value: 5 },
];

// 4. Especialistas Mais Procurados
const demandSpecialistsData = [
  { name: "Clínico Geral", solicitacoes: 3200 },
  { name: "Cardiologista", solicitacoes: 2100 },
  { name: "Oftalmologista", solicitacoes: 1800 },
  { name: "Dermatologista", solicitacoes: 1500 },
  { name: "Ginecologista", solicitacoes: 1200 },
  { name: "Pediatra", solicitacoes: 950 },
];

// Dados existentes (mantidos e ajustados)
const ubsData = [
  {
    id: 1,
    nome: "UBS Vila Nova",
    endereco: "Rua Santa Cruz, 123 - Três Vendas",
    telefone: "(53) 3225-7890",
    responsavel: "Dr. João Silva",
  },
  {
    id: 2,
    nome: "UBS Navegantes",
    endereco: "Rua Darcy Vargas, 456 - Porto",
    telefone: "(53) 3222-7891",
    responsavel: "Dra. Maria Santos",
  },
];

const hospitaisData = [
  {
    id: 1,
    nome: "Hospital Escola UFPel",
    tipo: "Hospital",
    endereco: "R. Prof. Araújo, 538 - Centro",
    telefone: "(53) 3284-4900",
    especialidades: "Geral, Oncologia, Maternidade",
  },
  {
    id: 2,
    nome: "Laboratório Antonello",
    tipo: "Laboratório",
    endereco: "R. 15 de Novembro, 600 - Centro",
    telefone: "(53) 3222-1111",
    especialidades: "Análises Clínicas",
  },
];

const oficiaisData = [
  {
    id: 1,
    nome: "Carlos Oliveira",
    cargo: "Coordenador",
    email: "carlos.pref@pelotas.rs.gov.br",
    telefone: "(53) 99999-2222",
    setor: "Gestão UBS",
  },
];

const kpiCards = [
  {
    titulo: "Vagas Ofertadas (Mês)",
    valor: "4.130",
    subtitulo: "Hospitais e Laboratórios somados",
  },
  {
    titulo: "Taxa de Absenteísmo",
    valor: "21.4%",
    subtitulo: "Pacientes que faltaram este mês",
  },
  {
    titulo: "Fila de Espera",
    valor: "1.240",
    subtitulo: "Aguardando especialista",
  },
  {
    titulo: "Satisfação (NPS)",
    valor: "72",
    subtitulo: "Zona de Qualidade",
  },
];

export default function AdminDashboard() {
  const [mainTab, setMainTab] = useState("administrativo");
  const [adminTab, setAdminTab] = useState("ubs");
  const [kpiTab, setKpiTab] = useState("visao-geral"); // Mudei o default para ser mais genérico

  return (
    <div className="dash-root">
      <header className="dash-header">
        <h1>Painel Administrativo - Saúde Pelotas</h1>
        <p>Monitoramento Integrado da Rede Municipal</p>

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
            Indicadores (KPIs)
          </button>
        </div>
      </header>

      <main className="dash-content">
        {mainTab === "administrativo" ? (
          <section className="card">
            <div className="card-header">
              <div>
                <h2>Gestão de Recursos</h2>
                <p>Gerencie as entidades da rede de saúde de Pelotas</p>
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
                  <span className="tab-icon">🏥</span> Hospitais/Labs
                </button>
                <button
                  className={`sub-tab ${
                    adminTab === "oficiais" ? "active" : ""
                  }`}
                  onClick={() => setAdminTab("oficiais")}
                >
                  <span className="tab-icon">👥</span> Oficiais
                </button>
              </div>

              <button className="primary-btn">
                +<span>Cadastrar Novo</span>
              </button>
            </div>

            {/* TABELAS (Mantidas do original, apenas dados atualizados) */}
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
          /* ================= SEÇÃO DE KPIS ================= */
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Cards de Resumo */}
            <section className="card">
              <div className="card-header">
                <h2>Resumo Estratégico</h2>
              </div>
              <div className="kpi-cards">
                {kpiCards.map((k) => (
                  <div key={k.titulo} className="kpi-card">
                    <div className="kpi-title-row">
                      <span className="kpi-title">{k.titulo}</span>
                    </div>
                    <div className="kpi-value">{k.valor}</div>
                    <div className="kpi-subtitle">{k.subtitulo}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* GRÁFICOS EM GRID */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
              gap: "20px" 
            }}>
              
              {/* 1. VAGAS POR INSTITUIÇÃO */}
              <section className="card chart-card">
                <div className="chart-header">
                  <h3>Oferta de Vagas (Mensal)</h3>
                  <p>Principais fornecedores de consultas/exames</p>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={vacanciesData} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                      <Tooltip />
                      <Bar dataKey="vagas" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Vagas Ofertadas" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* 4. DEMANDA POR ESPECIALISTA */}
              <section className="card chart-card">
                <div className="chart-header">
                  <h3>Especialidades Mais Procuradas</h3>
                  <p>Demanda reprimida e solicitações atuais</p>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={demandSpecialistsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="solicitacoes" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Solicitações" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* 2. PIE CHART - ABSENTEÍSMO */}
              <section className="card chart-card">
                <div className="chart-header">
                  <h3>Status das Consultas</h3>
                  <p>Taxa de comparecimento vs. Faltas</p>
                </div>
                <div className="chart-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={appointmentStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {appointmentStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS_STATUS[index % COLORS_STATUS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* 3. PERFIL DO ABSENTEÍSMO (Complexo) */}
              <section className="card chart-card">
                <div className="chart-header">
                  <h3>Perfil de Quem Falta (Absenteísmo)</h3>
                  <p>Análise de pacientes com faltas não justificadas</p>
                </div>
                
                {/* Mini Gráficos Internos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  
                  {/* Bairros */}
                  <div>
                    <h4 style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Por Bairro (Pelotas)</h4>
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={absenteeNeighborhoodData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} name="% Faltas" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                     {/* Gênero */}
                    <div style={{ flex: 1 }}>
                       <h4 style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>Por Gênero</h4>
                       <ResponsiveContainer width="100%" height={100}>
                        <PieChart>
                          <Pie data={absenteeGenderData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value">
                             <Cell fill="#EC4899" /> {/* Mulheres */}
                             <Cell fill="#3B82F6" /> {/* Homens */}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                       </ResponsiveContainer>
                       <div style={{textAlign: 'center', fontSize: '11px', color: '#888'}}>Rosa: Mulher / Azul: Homem</div>
                    </div>

                    {/* Idade */}
                    <div style={{ flex: 1 }}>
                       <h4 style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>Por Idade</h4>
                       <ResponsiveContainer width="100%" height={100}>
                         <BarChart data={absenteeAgeData}>
                           <Tooltip />
                           <Bar dataKey="value" fill="#64748B" name="% Idade" />
                           <XAxis dataKey="name" tick={{fontSize: 10}} />
                         </BarChart>
                       </ResponsiveContainer>
                    </div>
                  </div>

                </div>
              </section>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}