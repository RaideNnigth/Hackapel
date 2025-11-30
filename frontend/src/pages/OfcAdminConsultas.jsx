import { useState } from "react";

const MOCK_PACIENTES = {
  "12345678900": {
    nome: "João Silva Santos",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    consultas: [
      {
        id: 1,
        descricao: "Consulta Clínica Geral - 05/12/2025 às 10:00",
      },
      {
        id: 2,
        descricao: "Exame de Sangue - 08/12/2025 às 09:30",
      },
    ],
  },
  "98765432100": {
    nome: "Maria Oliveira Souza",
    cpf: "987.654.321-00",
    telefone: "(11) 91234-5678",
    email: "maria.oliveira@email.com",
    consultas: [
      {
        id: 3,
        descricao: "Consulta Pediatria - 10/12/2025 às 14:00",
      },
    ],
  },
  "11122233344": {
    nome: "Carlos Pereira Lima",
    cpf: "111.222.333-44",
    telefone: "(11) 90000-0000",
    email: "carlos.pereira@email.com",
    consultas: [],
  },
};

// Função para deixar o CPF bonitinho enquanto digita
function formatCpf(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 9);
  const part4 = digits.slice(9, 11);

  let formatted = part1;
  if (part2) formatted += "." + part2;
  if (part3) formatted += "." + part3;
  if (part4) formatted += "-" + part4;

  return formatted;
}

export default function ConfirmacaoConsultas() {
  const [cpfInput, setCpfInput] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [consultaSelecionada, setConsultaSelecionada] = useState("");
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  function handleCpfChange(e) {
    const valor = e.target.value;
    setCpfInput(formatCpf(valor));
    setErro("");
    setPaciente(null);
    setConsultaSelecionada("");
    setMensagemSucesso("");
  }

  function handleBuscarPaciente(e) {
    e.preventDefault();

    const cpfSomenteNumeros = cpfInput.replace(/\D/g, "");

    if (!cpfSomenteNumeros || cpfSomenteNumeros.length !== 11) {
      setErro("Digite um CPF válido com 11 dígitos.");
      setPaciente(null);
      return;
    }

    // aqui hoje buscamos no "mock"
    const encontrado = MOCK_PACIENTES[cpfSomenteNumeros];

    if (!encontrado) {
      setErro("Paciente não encontrado para o CPF informado.");
      setPaciente(null);
      return;
    }

    setPaciente(encontrado);
    setErro("");
    setMensagemSucesso("");
  }

  function handleEnviarNotificacao() {
    if (!consultaSelecionada) return;

    // aqui você depois chama sua API de envio de notificação
    // por enquanto, só simulamos:
    setMensagemSucesso(
      "Notificação de confirmação enviada com sucesso para o paciente."
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3fff7",
        padding: "32px 24px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI'",
      }}
    >
      {/* topo */}
      <button
        type="button"
        style={{
          border: "none",
          background: "transparent",
          color: "#1f2933",
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
          cursor: "pointer",
        }}
        onClick={() => window.history.back()}
      >
        <span style={{ fontSize: 24 }}>←</span>
        <span style={{ fontSize: 18, fontWeight: 500 }}>Voltar ao Menu</span>
      </button>

      <h1 style={{ fontSize: 28, fontWeight: 600, color: "#111827" }}>
        Solicitar Confirmação de Consulta
      </h1>
      <p
        style={{
          marginTop: 8,
          marginBottom: 24,
          fontSize: 18,
          color: "#4b5563",
          maxWidth: 800,
        }}
      >
        Busque o paciente e envie notificações para confirmar consultas e
        exames.
      </p>

      {/* Card de busca */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 0 0 1px #e5e7eb",
          maxWidth: 1200,
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            marginBottom: 8,
            color: "#111827",
          }}
        >
          Buscar Paciente
        </h2>
        <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 16 }}>
          Digite o CPF do paciente para visualizar suas consultas e exames
        </p>

        <form
          onSubmit={handleBuscarPaciente}
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          <div style={{ flex: 1 }}>
            <label
              htmlFor="cpf"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 500,
                color: "#111827",
              }}
            >
              CPF do Paciente
            </label>
            <input
              id="cpf"
              type="text"
              value={cpfInput}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: erro ? "1px solid #ef4444" : "1px solid #e5e7eb",
                background: "#f9fafb",
                fontSize: 16,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: 24,
              padding: "12px 32px",
              borderRadius: 12,
              border: "none",
              background: "#059669",
              color: "#ffffff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            <span role="img" aria-label="buscar">
              🔍
            </span>
            Buscar
          </button>
        </form>

        <p
          style={{
            marginTop: 16,
            fontSize: 14,
            color: "#4b5563",
          }}
        >
          Para teste, use: <strong>123.456.789-00</strong>,{" "}
          <strong>987.654.321-00</strong> ou <strong>111.222.333-44</strong>
        </p>

        {erro && (
          <p style={{ marginTop: 8, color: "#b91c1c", fontSize: 14 }}>{erro}</p>
        )}
      </div>

      {/* Dados do paciente + seleção de consulta */}
      {paciente && (
        <div style={{ marginTop: 24, maxWidth: 1200 }}>
          {/* Card dados paciente */}
          <div
            style={{
              background: "#ecfdf3",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #bbf7d0",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 24 }}>🧑‍⚕️</span>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#14532d",
                }}
              >
                Dados do Paciente
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>Nome</div>
                <div
                  style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}
                >
                  {paciente.nome}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>CPF</div>
                <div
                  style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}
                >
                  {paciente.cpf}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>Telefone</div>
                <div style={{ fontSize: 16, color: "#111827" }}>
                  {paciente.telefone}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>E-mail</div>
                <div style={{ fontSize: 16, color: "#111827" }}>
                  {paciente.email}
                </div>
              </div>
            </div>
          </div>

          {/* Card seleção de consulta */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 0 0 1px #e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 4,
                color: "#111827",
              }}
            >
              Selecionar Consulta ou Exame
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 15 }}>
              Escolha a consulta ou exame para enviar notificação de
              confirmação.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="consulta"
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 500,
                  color: "#111827",
                }}
              >
                Consultas e Exames Confirmados
              </label>
              <select
                id="consulta"
                value={consultaSelecionada}
                onChange={(e) => setConsultaSelecionada(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  fontSize: 15,
                }}
              >
                <option value="">Selecione uma consulta ou exame</option>
                {paciente.consultas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.descricao}
                  </option>
                ))}
              </select>
              {paciente.consultas.length === 0 && (
                <p style={{ marginTop: 8, fontSize: 14, color: "#6b7280" }}>
                  Este paciente não possui consultas/exames pendentes de
                  confirmação.
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!consultaSelecionada}
              onClick={handleEnviarNotificacao}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: 999,
                border: "none",
                background: consultaSelecionada ? "#22c55e" : "#9ca3af",
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 600,
                cursor: consultaSelecionada ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span role="img" aria-label="enviar">
                ✈️
              </span>
              Enviar Notificação de Confirmação
            </button>

            {mensagemSucesso && (
              <p
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: "#166534",
                }}
              >
                {mensagemSucesso}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
