import React, { useState } from 'react';
import {
  ArrowLeft,
  Newspaper,
  MessageSquare,
  Calendar,
  Info,
  Megaphone,
  AlertTriangle,
  Syringe,
  PlusCircle
} from 'lucide-react';

const PatientNewsletter = () => {
  const [activeTab, setActiveTab] = useState('informes'); // 'informes' or 'posts'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center font-sans">

      {/* Responsive Container */}
      <div className="w-full max-w-5xl bg-[#EEF2F6] min-h-screen md:min-h-0 md:my-8 md:rounded-2xl md:shadow-xl overflow-hidden flex flex-col relative pb-6">

        {/* Header - Purple Theme */}
        <header className="bg-white p-4 md:p-6 flex items-center gap-4 shadow-sm z-10 sticky top-0 md:static">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="bg-purple-600 p-2 rounded-full">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900 leading-tight">Eventos e Notícias</h1>
            <p className="text-sm text-gray-500">Secretaria de Saúde</p>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="bg-white px-4 pb-4 md:px-8 md:pb-6 pt-2">
          <div className="bg-gray-100 p-1 rounded-full flex relative">
            {/* Sliding Tab Logic */}
            <button
              onClick={() => setActiveTab('informes')}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 z-10 ${activeTab === 'informes' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Informes
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 z-10 ${activeTab === 'posts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Posts
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="p-4 md:p-8 flex-1">
          {activeTab === 'informes' ? <InformesView /> : <PostsView />}
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-gray-400 text-sm border-t border-gray-200/50 bg-[#EEF2F6]">
          PeloSUS - Saúde Municipal
        </footer>

      </div>
    </div>
  );
};

// --- Sub-component: Informes View (List Style) ---
const InformesView = () => {
  const messages = [
    {
      id: 1,
      text: "📱 Fique por dentro dos informes importantes da Secretaria de Saúde!",
      time: "Agora",
      isIntro: true
    },
    {
      id: 2,
      text: "📢 Atenção! A UBS Central estará fechada no dia 25/12 para manutenção. Em caso de emergência, dirija-se ao Pronto Socorro Municipal.",
      time: "28/11, 09:00",
      icon: Megaphone
    },
    {
      id: 3,
      text: "⚠️ Horário especial de fim de ano: De 20/12 a 05/01, todas as UBS funcionarão das 8h às 14h. Pronto-socorro mantém atendimento 24h.",
      time: "27/11, 14:30",
      icon: AlertTriangle
    },
    {
      id: 4,
      text: "💉 Lembrete: A vacina contra a gripe está disponível para idosos, gestantes e crianças. Procure a UBS mais próxima com documento e cartão SUS.",
      time: "26/11, 10:15",
      icon: Syringe
    },
    {
      id: 5,
      text: "🏥 Novo serviço disponível! Agora você pode agendar consultas pelo aplicativo oficial da Secretaria de Saúde. Baixe gratuitamente na loja de apps.",
      time: "25/11, 16:45",
      icon: PlusCircle
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {messages.map((msg) => (
        <div key={msg.id} className="flex gap-3 md:gap-4">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${msg.isIntro ? 'bg-purple-600' : 'bg-purple-500'
              }`}>
              {msg.isIntro ? (
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
              ) : (
                <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-white" />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 max-w-[85%] md:max-w-2xl">
            <div className="bg-white p-4 md:p-5 rounded-2xl rounded-tl-none shadow-sm text-gray-700 leading-relaxed text-sm md:text-base border border-gray-100">
              {msg.text}
            </div>
            <span className="text-xs text-gray-400 ml-1">{msg.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Sub-component: Posts View (Grid Style) ---
const PostsView = () => {
  const posts = [
    {
      id: 1,
      title: "Campanha de Vacinação contra a Gripe 2025",
      description: "Iniciamos a campanha nacional de vacinação contra a gripe. Grupos prioritários devem procurar a unidade de saúde mais próxima.",
      date: "30 de novembro de 2025",
      image: "https://images.unsplash.com/photo-1632053001712-42114674eb93?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Palestra Gratuita sobre Diabetes",
      description: "Participe da nossa palestra sobre prevenção e controle do diabetes. Profissionais especializados abordarão alimentação saudável e exercícios.",
      date: "29 de novembro de 2025",
      image: "https://images.unsplash.com/photo-1576091160550-217358c7db81?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Novos Equipamentos para o Hospital",
      description: "A prefeitura adquiriu novos equipamentos de raio-x e tomografia para modernizar o atendimento no Hospital Municipal.",
      date: "25 de novembro de 2025",
      image: "https://images.unsplash.com/photo-1516549655169-df83a092dd14?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Mutirão de Exames Laboratoriais",
      description: "Neste sábado teremos um mutirão para realização de exames de sangue e urina. Não é necessário agendamento prévio.",
      date: "22 de novembro de 2025",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-2 duration-300">

      {/* Intro Message for Posts */}
      <div className="flex gap-3 md:gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-[85%] md:max-w-2xl">
          <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-gray-700 text-sm md:text-base border border-gray-100">
            📰 Confira as últimas notícias e eventos de saúde da nossa cidade!
          </div>
          <span className="text-xs text-gray-400 ml-1">Agora</span>
        </div>
      </div>

      {/* Responsive Grid: 1 col mobile, 2 cols desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
            {/* Image Area */}
            <div className="h-48 overflow-hidden relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Content Area */}
            <div className="p-4 flex flex-col gap-2 h-full">
              <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-purple-700 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {post.description}
              </p>

              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientNewsletter;