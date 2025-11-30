import React from 'react';
import {
  Building2,
  LogOut,
  UserPlus,
  UserCog,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const UBSDashboard = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    // delete localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // redirect to login
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Header - Full Width for Dashboard feel */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo / UBS Info */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">UBS Central - São Paulo</h1>
              <p className="text-xs text-gray-500 font-medium">CNES: 2077852</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-200 transition-colors duration-200"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo ao Sistema de Saúde Integrado
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            Gerencie os cadastros de pacientes da sua unidade básica de saúde de forma rápida e segura.
          </p>
        </div>

        {/* Quick Actions Label */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Ações Rápidas</h3>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: Criar Conta (Blue Theme) */}
          <ActionCard
            title="Criar Conta para Paciente"
            description="Cadastre um novo paciente no sistema de saúde integrado com todos os dados necessários."
            icon={UserPlus}
            theme="blue"
            click={() => navigate('/ubs/create-patient')}
          />

          {/* Card 2: Atualizar Conta (Green Theme) */}
          <ActionCard
            title="Atualizar Conta de Paciente"
            description="Busque um paciente por CPF e atualize telefone, endereço e email."
            icon={UserCog}
            theme="green"
            click={() => navigate('/ubs/update-patient')}
          />

        </div>
      </main>
    </div>
  );
};

// Reusable Action Card Component
const ActionCard = ({ title, description, icon: Icon, theme, click }) => {
  // Theme configuration object
  const themes = {
    blue: {
      bgIcon: 'bg-blue-100',
      textIcon: 'text-blue-600',
      hoverBorder: 'hover:border-blue-300',
      hoverShadow: 'hover:shadow-blue-100',
      activeRing: 'active:ring-blue-100'
    },
    green: {
      bgIcon: 'bg-green-100',
      textIcon: 'text-green-600',
      hoverBorder: 'hover:border-green-300',
      hoverShadow: 'hover:shadow-green-100',
      activeRing: 'active:ring-green-100'
    }
  };

  const currentTheme = themes[theme];

  return (
    <button
      className={`
      text-left w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm 
      transition-all duration-300 group
      ${currentTheme.hoverBorder} 
      hover:shadow-lg ${currentTheme.hoverShadow}
      active:scale-[0.99] focus:outline-none focus:ring-4 ${currentTheme.activeRing}
    `}
      onClick={() => click()}
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${currentTheme.bgIcon} transition-colors`}>
            <Icon className={`w-6 h-6 ${currentTheme.textIcon}`} />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
        </div>

        <div>
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
            {title}
          </h4>
          <p className="text-gray-500 mt-2 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default UBSDashboard;