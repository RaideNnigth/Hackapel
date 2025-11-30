import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Painel do Admin</h1>

      <div className="flex flex-col gap-3">
        <Link to="/admin/medicos" className="p-3 bg-gray-200 rounded">
          Cadastrar / Deletar Médicos
        </Link>

        <Link to="/admin/agendamentos" className="p-3 bg-gray-200 rounded">
          Acessar Agendamentos
        </Link>
      </div>
    </div>
  );
}
