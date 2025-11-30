import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  LogOut,
  ArrowLeft,
  Save,
  Loader2,
  Lock
} from 'lucide-react';

const UBSCreatePatient = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Estado atualizado para corresponder exatamente ao JSON da API
  const [formData, setFormData] = useState({
    full_name: '',
    cpf: '',
    email: '',
    password: '',
    phone_number: '',
    address_zipcode: '',
    address_street: '',
    address_number: '',
    address_complement: '',
    address_neighborhood: '',
    address_city: '',
    address_state: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio para API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // O JSON aqui já estará no formato correto para sua API
    console.log("🚀 Payload para API:", JSON.stringify(formData, null, 2));

    alert("Paciente cadastrado com sucesso!");
    setIsLoading(false);
  };

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
    <div className="min-h-screen bg-slate-50 font-sans pb-12">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">UBS Central - São Paulo</h1>
              <p className="text-xs text-gray-500 font-medium">CNES: 2077852</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-200 transition-colors"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Navegação e Título */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <button
            className="self-start flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 transition shadow-sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Criar Conta para Paciente</h2>
            <p className="text-gray-500">Preencha os dados para criar o acesso do paciente</p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Dados do Paciente</h3>
            <p className="text-sm text-gray-500">Todos os campos marcados com <span className="text-red-500">*</span> são obrigatórios</p>
          </div>

          <div className="space-y-8">

            {/* Seção 1: Dados Pessoais Básicos */}
            <section>
              <h4 className="text-sm font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Dados Pessoais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Nome Completo"
                  name="full_name"
                  placeholder="João da Silva"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                />
                <InputField
                  label="CPF"
                  name="cpf"
                  placeholder="000.000.000-00"
                  required
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Seção 2: Conta e Contato */}
            <section>
              <h4 className="text-sm font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Conta e Contato</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="joao@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputField
                  label="Telefone (Celular)"
                  name="phone_number"
                  placeholder="(51) 99999-9999"
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Seção 3: Endereço */}
            <section>
              <h4 className="text-sm font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Endereço</h4>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* CEP e Logradouro */}
                <div className="md:col-span-3">
                  <InputField
                    label="CEP"
                    name="address_zipcode"
                    placeholder="96000-000"
                    required
                    value={formData.address_zipcode}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-9">
                  <InputField
                    label="Logradouro"
                    name="address_street"
                    placeholder="Rua Central"
                    required
                    value={formData.address_street}
                    onChange={handleChange}
                  />
                </div>

                {/* Número e Complemento */}
                <div className="md:col-span-3">
                  <InputField
                    label="Número"
                    name="address_number"
                    placeholder="100"
                    required
                    value={formData.address_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-9">
                  <InputField
                    label="Complemento"
                    name="address_complement"
                    placeholder="Apto 12"
                    value={formData.address_complement}
                    onChange={handleChange}
                  />
                </div>

                {/* Bairro, Cidade, Estado */}
                <div className="md:col-span-5">
                  <InputField
                    label="Bairro"
                    name="address_neighborhood"
                    placeholder="Centro"
                    required
                    value={formData.address_neighborhood}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-5">
                  <InputField
                    label="Cidade"
                    name="address_city"
                    placeholder="Pelotas"
                    required
                    value={formData.address_city}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <InputField
                    label="Estado"
                    name="address_state"
                    placeholder="RS"
                    required
                    value={formData.address_state}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </section>

          </div>

          {/* Footer de Ações */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 focus:ring-4 focus:ring-gray-100 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isLoading ? 'Cadastrando...' : 'Cadastrar Paciente'}
            </button>

            <button
              type="button"
              disabled={isLoading}
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 transition-all disabled:opacity-70"
            >
              Cancelar
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

// Componente Reutilizável de Input
const InputField = ({ label, name, type = "text", placeholder, required, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-100/80 border-transparent focus:bg-white focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-all duration-200 hover:bg-gray-100"
        />
        {/* Ícone de cadeado visual para senha */}
        {name === 'password' && (
          <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            <Lock className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UBSCreatePatient;