// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api_helper.js";

export default function AdminLogin() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const login_btn = async (e) => {
    e.preventDefault();

    try {
      const body = {
        cpf: cpf,
        password: senha,
      };

      const response = await api.post('api/auth/loginAdmin', body);

      const { token, user } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate("/admin/dashboard");
    }
    catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full">

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c.942 0 1.833-.296 2.588-.8a4.992 4.992 0 00-10 0A4.992 4.992 0 009.412 11c.755.504 1.646.8 2.588.8z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12.5c-4.418 0-8 2.239-8 5v1.5h16V17.5c0-2.761-3.582-5-8-5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800">
          Login do Administrador
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Acesso restrito
        </p>

        <label className="text-gray-700 font-medium">CPF</label>
        <input
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full mt-1 mb-4 p-3 border rounded-lg bg-gray-100"
        />

        <label className="text-gray-700 font-medium">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mt-1 mb-6 p-3 border rounded-lg bg-gray-100"
        />

        <button
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
          onClick={login_btn}
        >
          Entrar como Administrador
        </button>

        <p className="text-center mt-4 text-gray-600">
          Voltar ao login normal?{" "}
          <Link className="text-blue-600 font-medium" to="/">
            Clique aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
