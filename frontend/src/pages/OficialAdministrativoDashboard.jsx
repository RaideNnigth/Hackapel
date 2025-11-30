import "../css/OficialAdministrativoDashboard.css";
import { useNavigate } from "react-router-dom";

export default function OficialAdministrativoDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <h1>Painel do Administrador</h1>
      <p className="subtitle">Selecione a funcionalidade que deseja acessar</p>

      <div className="cards-wrapper">
        
        {/* Card Gerenciar Planilhas */}
        <div 
          className="admin-card"
          onClick={() => navigate("/admin-agendas")}
        >
          <div className="icon blue">
            📄
          </div>

          <h3>Gerenciar Planilhas</h3>
          <p className="desc">
            Acesse e gerencie as planilhas de agendas enviadas pelos hospitais
          </p>

          <ul>
            <li>Visualizar planilhas recebidas</li>
            <li>Baixar arquivos CSV</li>
            <li>Confirmar e processar agendas</li>
          </ul>

          <div className="arrow">→</div>
        </div>

        {/* Card Solicitar Confirmações */}
        <div 
          className="admin-card"
          onClick={() => navigate("/admin-confirmacoes")}
        >
          <div className="icon green">
            🔔
          </div>

          <h3>Solicitar Confirmações</h3>
          <p className="desc">
            Envie notificações para pacientes confirmarem suas consultas e exames
          </p>

          <ul>
            <li>Buscar paciente por CPF</li>
            <li>Visualizar consultas/exames</li>
            <li>Enviar notificação de confirmação</li>
          </ul>

          <div className="arrow">→</div>
        </div>

      </div>
    </div>
  );
}
