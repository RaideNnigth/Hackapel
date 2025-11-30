import { useState } from "react";

export default function PlanilhaGercon() {
  const [rows, setRows] = useState([
    { prestador: "", endereco: "", especialidade: "", data: "", horario: "", profissional: "" }
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { prestador: "", endereco: "", especialidade: "", data: "", horario: "", profissional: "" }
    ]);
  };

  const updateCell = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const exportCSV = () => {
    const header = [
      "Prestador",
      "Endereço",
      "Especialidade Consulta/Exame",
      "Data",
      "Horário",
      "Nome do Profissional"
    ].join(",");

    const lines = rows.map(r =>
      [
        r.prestador,
        r.endereco,
        r.especialidade,
        r.data,
        r.horario,
        r.profissional
      ].join(",")
    );

    const csvContent = [header, ...lines].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "gercon.csv";
    a.click();
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Planilha GERCON</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          fontSize: "16px"
        }}
      >
        <thead>
          <tr>
            <th style={th}>Prestador</th>
            <th style={th}>Endereço</th>
            <th style={th}>Especialidade</th>
            <th style={th}>Data</th>
            <th style={th}>Horário</th>
            <th style={th}>Nome do Profissional</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td style={td}>
                <input
                  style={input}
                  value={row.prestador}
                  onChange={e => updateCell(idx, "prestador", e.target.value)}
                />
              </td>

              <td style={td}>
                <input
                  style={input}
                  value={row.endereco}
                  onChange={e => updateCell(idx, "endereco", e.target.value)}
                />
              </td>

              <td style={td}>
                <input
                  style={input}
                  value={row.especialidade}
                  onChange={e => updateCell(idx, "especialidade", e.target.value)}
                />
              </td>

              <td style={td}>
                <input
                  type="date"
                  style={input}
                  value={row.data}
                  onChange={e => updateCell(idx, "data", e.target.value)}
                />
              </td>

              <td style={td}>
                <input
                  type="time"
                  style={input}
                  value={row.horario}
                  onChange={e => updateCell(idx, "horario", e.target.value)}
                />
              </td>

              <td style={td}>
                <input
                  style={input}
                  value={row.profissional}
                  onChange={e => updateCell(idx, "profissional", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={btnAdd} onClick={addRow}>➕ Adicionar Linha</button>
      <button style={btnExport} onClick={exportCSV}>📤 Exportar CSV</button>
    </div>
  );
}

const th = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#f4f4f4",
  textAlign: "left"
};

const td = {
  border: "1px solid #ccc",
  padding: "5px"
};

const input = {
  width: "100%",
  padding: "6px",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

const btnAdd = {
  padding: "10px 20px",
  marginRight: "10px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const btnExport = {
  padding: "10px 20px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
