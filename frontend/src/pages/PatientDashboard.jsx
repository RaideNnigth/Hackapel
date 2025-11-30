import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, CheckCircle2, Newspaper, UserCog, LogOut, Check } from 'lucide-react';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');

    setShowLogoutNotification(true);
    // Hide notification after 3 seconds
    setTimeout(() => setShowLogoutNotification(false), 3000);
  };

  const cards = [
    {
      title: "Meus Agendamentos",
      description: "Consulte seus agendamentos confirmados",
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      buttonText: "Acessar",
    },
    {
      title: "Confirmar/Cancelar Consulta",
      description: "Gerencie suas consultas agendadas",
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      buttonText: "Acessar",
    },
    {
      title: "Eventos e Notícias",
      description: "Acompanhe eventos da Secretaria de Saúde",
      icon: <Newspaper className="w-6 h-6 text-purple-600" />,
      buttonText: "Acessar",
    },
    {
      title: "Atualizar Dados",
      description: "Atualize telefone, email e endereço",
      icon: <UserCog className="w-6 h-6 text-orange-600" />,
      buttonText: "Acessar",
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEF2FF] font-sans text-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Section */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl md:text-2xl font-semibold text-blue-700">
                PeloSUS
              </h1>
            </div>
            <p className="text-gray-600 ml-1">
              Bem-vindo(a) ao seu painel do paciente.
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-red-50 hover:border-red-200 hover:shadow-md transition-all duration-200 self-start md:self-auto focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-red-700 transition-colors">
              Sair do Sistema
            </span>
          </button>
        </header>

        {/* Welcome Banner */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex">
          <div className="w-1.5 bg-blue-600 flex-shrink-0"></div>
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Olá, {user.full_name}!
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Acesse todas as funcionalidades do sistema através dos cartões abaixo
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-blue-100 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-1 flex-shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {card.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-500 mb-8 ml-9 text-sm">
                {card.description}
              </p>

              <div className="mt-auto">
                <button className="w-full bg-[#05051F] hover:bg-black text-white font-medium py-3 rounded-lg transition-colors text-sm tracking-wide">
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;