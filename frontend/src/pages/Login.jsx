// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api_helper.js";

export default function Login() {
  const [tipo, setTipo] = useState("Paciente");
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Checar se o tipo usa CPF ou CNES
  const placeholder =
    tipo === "Hospital/Laboratório (CNES)" || tipo === "UBS (CNES)"
      ? "Digite o CNES"
      : "Digite o CPF (000.000.000-00)";

  const param_name =
    tipo === "Hospital/Laboratório (CNES)" || tipo === "UBS (CNES)"
      ? "cnes"
      : "cpf";

  const login_btn = async (e) => {
    e.preventDefault();

    try {
      const body = {
        password: senha,
      };
      body[param_name] = identificador;

      const response = await api.post('api/auth/login', body);

      const { token, user } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirecionar com base no tipo de usuário
      if (tipo === "Paciente") {
        navigate('/patient/dashboard');
      }

      else if (tipo === "Oficial Administrativo (CPF)") {
        navigate('/ofc-admin/dashboard');
      }

      // else if (tipo === "Hospital/Laboratório (CNES)") {
      //   navigate('/hospital/dashboard');
      // }

      // else if (tipo === "UBS (CNES)") {
      //   navigate('/ubs/dashboard');
      // }
      
    }
    catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
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

        <h2 className="text-center text-xl font-semibold text-gray-800">
          PeloSUS
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Faça login para acessar o sistema
        </p>

        {/* Dropdown Tipo de User */}
        <label className="text-gray-700 font-medium">Tipo de Usuário</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100"
        >
          <option>Paciente (CPF)</option>
          <option>Oficial Administrativo (CPF)</option>
          <option>Hospital/Laboratório (CNES)</option>
          <option>UBS (CNES)</option>
        </select>

        {/* CPF ou CNES */}
        <label className="text-gray-700 font-medium">Identificação</label>
        <input
          type="text"
          placeholder={placeholder}
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100"
        />

        {/* Senha */}
        <label className="text-gray-700 font-medium">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mt-1 mb-6 p-3 border rounded-lg bg-gray-100"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          onClick={login_btn}
        >
          Entrar
        </button>

        <p className="text-center mt-4 text-gray-600">
          É administrador?{" "}
          <Link className="text-blue-600 font-medium" to="/admin-login">
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
