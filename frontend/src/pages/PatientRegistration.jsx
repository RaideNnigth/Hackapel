import { useState } from "react";
import "../css/PatientRegistration.css";

export default function PatientRegistration() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // aqui você pode chamar sua API
    console.log("Dados do paciente:", form);
    alert("Paciente registrado (mock)!");
  }

  function handleReset() {
    setForm({
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      senha: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    });
  }

  return (
    <div className="pr-root">
      <div className="pr-header">
        <h1>Registro de Pacientes</h1>
        <p>Preencha os dados do paciente para realizar o cadastro</p>
      </div>

      <main className="pr-card">
        <header className="pr-card-header">
          <div>
            <h2>Dados do Paciente</h2>
            <p>Todos os campos marcados com * são obrigatórios</p>
          </div>
        </header>

        <form className="pr-form" onSubmit={handleSubmit}>
          <section className="pr-section">
            <h3>Dados Pessoais</h3>

            <div className="pr-grid pr-grid-2">
              <label className="pr-field">
                <span>Nome Completo *</span>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="João da Silva"
                  required
                />
              </label>

              <label className="pr-field">
                <span>CPF *</span>
                <input
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </label>

              <label className="pr-field">
                <span>E-mail *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="joao@example.com"
                  required
                />
              </label>

              <label className="pr-field">
                <span>Telefone *</span>
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="(51) 99999-9999"
                  required
                />
              </label>

              <label className="pr-field pr-field-full">
                <span>Senha *</span>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </label>
            </div>
          </section>

          <section className="pr-section">
            <h3>Endereço</h3>

            <div className="pr-grid pr-grid-2">
              <label className="pr-field">
                <span>Rua *</span>
                <input
                  name="rua"
                  value={form.rua}
                  onChange={handleChange}
                  placeholder="Rua Central"
                  required
                />
              </label>

              <label className="pr-field">
                <span>Número *</span>
                <input
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  placeholder="100"
                  required
                />
              </label>

              <label className="pr-field">
                <span>Complemento</span>
                <input
                  name="complemento"
                  value={form.complemento}
                  onChange={handleChange}
                  placeholder="Apto 12"
                />
              </label>

              <label className="pr-field">
                <span>Bairro *</span>
                <input
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                  placeholder="Centro"
                  required
                />
              </label>

              <label className="pr-field">
                <span>Cidade *</span>
                <input
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  placeholder="Pelotas"
                  required
                />
              </label>

              <label className="pr-field">
                <span>Estado *</span>
                <input
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  placeholder="RS"
                  required
                />
              </label>

              <label className="pr-field pr-field-full">
                <span>CEP *</span>
                <input
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  placeholder="96000-000"
                  required
                />
              </label>
            </div>
          </section>

          <footer className="pr-actions">
            <button type="submit" className="pr-btn-primary">
              Registrar Paciente
            </button>
            <button
              type="button"
              className="pr-btn-secondary"
              onClick={handleReset}
            >
              Limpar
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}
