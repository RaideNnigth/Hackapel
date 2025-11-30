import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  LogOut,
  ArrowLeft,
  Save,
  Loader2,
  Lock,
  Search,
  UserCog
} from 'lucide-react';

const UBSUpdatePatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchCpf, setSearchCpf] = useState('');
  const [patientFound, setPatientFound] = useState(false);

  // Estado inicial vazio
  const [formData, setFormData] = useState({
    full_name: '',
    cpf: '',
    email: '',
    password: '', // Campo de senha incluído conforme pedido
    phone_number: '',
    address_zipcode: '',
    address_street: '',
    address_number: '',
    address_complement: '',
    address_neighborhood: '',
    address_city: '',
    address_state: ''
  });

  // Função para simular a busca do paciente
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCpf) return;

    setIsSearching(true);

    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simula dados retornados do backend (Preenche o form)
    setFormData({
      full_name: 'Maria Silva Santos',
      cpf: searchCpf,
      email: 'maria.silva@email.com',
      password: '', // Senha vem vazia por segurança, user preenche se quiser mudar
      phone_number: '(11) 98765-4321',
      address_zipcode: '01310-100',
      address_street: 'Avenida Paulista',
      address_number: '1578',
      address_complement: 'Apto 901',
      address_neighborhood: 'Bela Vista',
      address_city: 'São Paulo',
      address_state: 'SP'
    });

    setPatientFound(true);
    setIsSearching(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio para API
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("🚀 Payload de Atualização (snake_case):", JSON.stringify(formData, null, 2));

    alert("Dados do paciente atualizados com sucesso!");
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
            <h2 className="text-2xl font-bold text-gray-900">Atualizar Conta de Paciente</h2>
            <p className="text-gray-500">Busque o paciente por CPF para atualizar os dados</p>
          </div>
        </div>

        {/* CARD DE BUSCA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Buscar Paciente</h3>
          <p className="text-sm text-gray-500 mb-4">Digite o CPF do paciente para localizar o cadastro</p>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow w-full">
              <label className="text-sm font-semibold text-gray-700 ml-1 mb-1.5 block">CPF</label>
              <input
                type="text"
                value={searchCpf}
                onChange={(e) => setSearchCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-2.5 text-gray-900 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !searchCpf}
              className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-70 transition-all flex items-center justify-center gap-2 h-[46px]"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
        </div>

        {/* FORMULÁRIO DE EDIÇÃO (Só aparece se encontrou paciente) */}
        {patientFound && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <UserCog className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Dados do Paciente</h3>
            </div>

            <div className="space-y-8">

              {/* Seção 1: Informações Gerais (Read Only) */}
              <section>
                <h4 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Informações Gerais (Identificação)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  <InputField
                    label="Nome Completo"
                    name="full_name"
                    value={formData.full_name}
                    readOnly={true} // Campo travado
                  />
                  <InputField
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    readOnly={true} // Campo travado
                  />
                </div>
              </section>

              {/* Seção 2: Contato e Segurança (Editável) */}
              <section>
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                  <h4 className="text-sm font-medium text-gray-900">Contato e Segurança (Editável)</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Permite Edição</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Nova Senha"
                    name="password"
                    type="password"
                    placeholder="Deixe vazio para manter"
                    value={formData.password}
                    onChange={handleChange}
                    icon={Lock}
                  />
                  <InputField
                    label="Telefone"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Seção 3: Endereço (Editável) */}
              <section>
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                  <h4 className="text-sm font-medium text-gray-900">Endereço (Editável)</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Permite Edição</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                  {/* CEP e Logradouro */}
                  <div className="md:col-span-3">
                    <InputField
                      label="CEP"
                      name="address_zipcode"
                      required
                      value={formData.address_zipcode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-9">
                    <InputField
                      label="Logradouro"
                      name="address_street"
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
                      required
                      value={formData.address_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-9">
                    <InputField
                      label="Complemento"
                      name="address_complement"
                      value={formData.address_complement}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Bairro, Cidade, Estado */}
                  <div className="md:col-span-5">
                    <InputField
                      label="Bairro"
                      name="address_neighborhood"
                      required
                      value={formData.address_neighborhood}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <InputField
                      label="Cidade"
                      name="address_city"
                      required
                      value={formData.address_city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <InputField
                      label="Estado"
                      name="address_state"
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
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 focus:ring-4 focus:ring-gray-100 transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>

              <button
                type="button"
                onClick={() => setPatientFound(false)}
                disabled={isLoading}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 transition-all disabled:opacity-70"
              >
                Cancelar
              </button>
            </div>

          </form>
        )}
      </main>
    </div>
  );
};

// Componente Reutilizável de Input
const InputField = ({ label, name, type = "text", placeholder, required, value, onChange, readOnly, icon: Icon }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700 ml-1">
        {label} {required && !readOnly && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={readOnly}
          className={`
            w-full rounded-lg px-4 py-2.5 transition-all duration-200
            ${readOnly
              ? 'bg-gray-200/50 text-gray-500 border-transparent cursor-not-allowed'
              : 'bg-gray-100/80 border-transparent text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 hover:bg-gray-100'
            }
          `}
        />
        {Icon && (
          <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UBSUpdatePatient;