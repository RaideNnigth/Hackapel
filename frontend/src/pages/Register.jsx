// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [tipo, setTipo] = useState("Paciente");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full">

        {/* Ícone */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>

        {/* Títulos */}
        <h2 className="text-center text-xl font-semibold text-gray-800">
          Cadastro
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Crie sua conta no sistema de saúde
        </p>

        {/* Tipo de Usuário */}
        <label className="text-gray-700 font-medium">Tipo de Usuário</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Paciente</option>
          <option>Técnico Administrativo</option>
          <option>Hospital/Laboratório</option>
        </select>

        {/* Nome completo */}
        <label className="text-gray-700 font-medium">Nome Completo</label>
        <input
          type="text"
          placeholder="Digite seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* CPF */}
        <label className="text-gray-700 font-medium">CPF</label>
        <input
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* E-mail */}
        <label className="text-gray-700 font-medium">E-mail</label>
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Telefone */}
        <label className="text-gray-700 font-medium">Telefone</label>
        <input
          type="text"
          placeholder="(00) 00000-0000"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Senha */}
        <label className="text-gray-700 font-medium">Senha</label>
        <input
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Confirmar Senha */}
        <label className="text-gray-700 font-medium">Confirmar Senha</label>
        <input
          type="password"
          placeholder="Digite a senha novamente"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="w-full mt-1 mb-6 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Botão */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          onClick={() => alert("Cadastro ainda não implementado")}
        >
          <span>👤</span> Cadastrar
        </button>

        {/* Link para login */}
        <p className="text-center mt-4 text-gray-600">
          Já tem uma conta?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
