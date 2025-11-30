import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Edit2,
  CheckCircle2,
  Save,
  X,
  Loader2
} from 'lucide-react';

const PatientUpdate = () => {
  // Estado para armazenar os dados do usuário
  const [formData, setFormData] = useState({
    phone: '(11) 98765-4321',
    email: 'paciente@email.com',
    street: 'Rua das Flores, 123',
    complement: 'Apto 45',
    district: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zip: '01234-567'
  });

  // Estado para controlar qual seção está em modo de edição ('contact', 'address' ou null)
  const [editingSection, setEditingSection] = useState(null);

  // Estado para simular o carregamento da API
  const [isSaving, setIsSaving] = useState(false);

  // Função genérica para atualizar os campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função que simula o envio para o Backend
  const handleSave = async (section) => {
    setIsSaving(true);

    // 1. Simula delay de rede (1.5 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Prepara o payload para a API
    const payload = {
      sectionUpdated: section, // 'contact' ou 'address'
      timestamp: new Date().toISOString(),
      data: formData
    };

    // 3. LOG DO PAYLOAD (Aqui é onde você integraria o fetch/axios real)
    console.log("🚀 ENVIANDO PARA API:", JSON.stringify(payload, null, 2));

    // 4. Finaliza edição
    setIsSaving(false);
    setEditingSection(null);
    alert(`Dados de ${section === 'contact' ? 'Contato' : 'Endereço'} salvos com sucesso!`);
  };

  // Função para cancelar edição (restauraria os dados originais em um app real)
  const handleCancel = () => {
    setEditingSection(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center font-sans">

      <div className="w-full max-w-5xl bg-[#EEF2F6] min-h-screen md:min-h-0 md:my-8 md:rounded-2xl md:shadow-xl overflow-hidden flex flex-col relative pb-6">

        {/* Header */}
        <header className="bg-white p-4 md:p-6 flex items-center gap-4 shadow-sm z-10 sticky top-0 md:static">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="bg-orange-500 p-2 rounded-full">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900 leading-tight">Meus Dados</h1>
            <p className="text-sm text-gray-500">Informações de contato e endereço</p>
          </div>
        </header>

        <main className="p-4 md:p-8 flex flex-col gap-6">

          {/* Banner de Aviso */}
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-4 md:p-5 flex gap-4 items-start shadow-sm">
            <div className="mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-orange-900 text-sm md:text-base">Mantenha seus dados atualizados!</h3>
              <p className="text-sm text-orange-800/80 mt-1 leading-relaxed">
                Informações corretas garantem que possamos entrar em contato e enviar notificações importantes sobre suas consultas.
              </p>
            </div>
          </div>

          {/* --- SEÇÃO 1: CONTATO --- */}
          <div className={`bg-white rounded-xl shadow-sm border transition-colors duration-300 overflow-hidden ${editingSection === 'contact' ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'}`}>

            <div className="bg-blue-50/50 p-4 flex justify-between items-center border-b border-blue-100/50">
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="font-semibold text-gray-800">Informações de Contato</h2>
                  <p className="text-xs text-gray-500 hidden sm:block">Telefone e e-mail para comunicação</p>
                </div>
              </div>

              {/* Botões de Ação Dinâmicos */}
              {editingSection === 'contact' ? (
                <div className="flex gap-2">
                  <button onClick={handleCancel} disabled={isSaving} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                    <X className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleSave('contact')} disabled={isSaving} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditingSection('contact')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 transition shadow-sm">
                  <Edit2 className="w-3.5 h-3.5" />
                  Editar
                </button>
              )}
            </div>

            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Telefone"
                name="phone"
                value={formData.phone}
                icon={Phone}
                color="blue"
                isEditing={editingSection === 'contact'}
                onChange={handleInputChange}
              />
              <EditableField
                label="E-mail"
                name="email"
                value={formData.email}
                icon={Mail}
                color="blue"
                isEditing={editingSection === 'contact'}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* --- SEÇÃO 2: ENDEREÇO --- */}
          <div className={`bg-white rounded-xl shadow-sm border transition-colors duration-300 overflow-hidden ${editingSection === 'address' ? 'border-fuchsia-300 ring-2 ring-fuchsia-100' : 'border-gray-100'}`}>

            <div className="bg-fuchsia-50/50 p-4 flex justify-between items-center border-b border-fuchsia-100/50">
              <div className="flex gap-3 items-center">
                <MapPin className="w-5 h-5 text-fuchsia-600" />
                <div>
                  <h2 className="font-semibold text-gray-800">Endereço Residencial</h2>
                  <p className="text-xs text-gray-500 hidden sm:block">Local de residência cadastrado</p>
                </div>
              </div>

              {editingSection === 'address' ? (
                <div className="flex gap-2">
                  <button onClick={handleCancel} disabled={isSaving} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                    <X className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleSave('address')} disabled={isSaving} className="flex items-center gap-2 px-3 py-1.5 bg-fuchsia-600 text-white rounded-lg text-sm font-medium hover:bg-fuchsia-700 transition shadow-sm">
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditingSection('address')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 transition shadow-sm">
                  <Edit2 className="w-3.5 h-3.5" />
                  Editar
                </button>
              )}
            </div>

            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Endereço quebra em vários campos quando editável */}
              {editingSection === 'address' ? (
                <>
                  <EditableField label="CEP" name="zip" value={formData.zip} icon={MapPin} color="fuchsia" isEditing={true} onChange={handleInputChange} />
                  <EditableField label="Estado (UF)" name="state" value={formData.state} icon={MapPin} color="fuchsia" isEditing={true} onChange={handleInputChange} />
                  <EditableField label="Cidade" name="city" value={formData.city} icon={MapPin} color="fuchsia" isEditing={true} onChange={handleInputChange} />
                  <EditableField label="Bairro" name="district" value={formData.district} icon={MapPin} color="fuchsia" isEditing={true} onChange={handleInputChange} />
                  <div className="md:col-span-2 flex gap-4">
                    <EditableField label="Rua" name="street" value={formData.street} icon={MapPin} color="fuchsia" isEditing={true} onChange={handleInputChange} className="flex-grow" />
                    <EditableField label="Compl." name="complement" value={formData.complement} icon={MapPin} color="fuchsia" isEditing={true} onChange={handleInputChange} className="w-32" />
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 flex gap-4 items-start md:col-span-2">
                  <div className="bg-white p-2 rounded-full shadow-sm mt-1">
                    <MapPin className="w-4 h-4 text-fuchsia-500" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-lg">{formData.street}, {formData.complement}</p>
                    <div className="text-gray-500 text-sm mt-1 space-y-0.5">
                      <p>{formData.district}</p>
                      <p>{formData.city} - {formData.state}</p>
                      <p>CEP: {formData.zip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

// Componente Auxiliar para Campos Editáveis
const EditableField = ({ label, name, value, icon: Icon, color, isEditing, onChange, className = "" }) => {
  const colorClasses = {
    blue: "text-blue-500",
    fuchsia: "text-fuchsia-500"
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-3 md:p-4 flex gap-3 items-center ${className}`}>
      <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">
        <Icon className={`w-4 h-4 ${colorClasses[color]}`} />
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</p>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all"
            style={{
              '--tw-ring-color': color === 'blue' ? '#3b82f6' : '#d946ef'
            }}
          />
        ) : (
          <p className="text-gray-900 font-medium truncate">{value}</p>
        )}
      </div>
    </div>
  );
};

export default PatientUpdate;