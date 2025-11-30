import React from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Calendar, 
  User, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Bot 
} from 'lucide-react';

const PatientAppointments = () => {
  // Mock data based on your image
  const appointments = [
    {
      id: 1,
      type: "Cardiologia",
      doctor: "Dr. João Silva",
      date: "05 de dezembro de 2025",
      time: "14:30",
      location: "UBS Central - Sala 3",
      status: "confirmed",
      timestamp: "25/11, 10:30"
    },
    {
      id: 2,
      type: "Clínico Geral",
      doctor: "Dra. Maria Santos",
      date: "10 de dezembro de 2025",
      time: "09:00",
      location: "UBS Zona Norte - Sala 1",
      status: "pending",
      timestamp: "28/11, 14:15"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      {/* Mobile Container Simulation */}
      <div className="w-full max-w-md bg-[#EEF2F6] min-h-screen shadow-xl relative">
        
        {/* Header */}
        <header className="bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
          <button className="p-1 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="bg-blue-600 p-1.5 rounded-full">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 leading-tight">Sistema de Saúde</h1>
            <p className="text-xs text-gray-500">Seus agendamentos</p>
          </div>
        </header>

        <main className="p-4 flex flex-col gap-6">
          
          {/* Intro Message */}
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-1 max-w-[85%]">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 leading-relaxed">
                Olá! 👋 Aqui estão seus agendamentos confirmados e pendentes. 
                Você pode confirmá-los ou cancelá-los diretamente.
              </div>
              <span className="text-xs text-gray-400 ml-1">Agora</span>
            </div>
          </div>

          {/* Appointment Cards Loop */}
          {appointments.map((apt) => (
            <AppointmentItem key={apt.id} data={apt} />
          ))}

        </main>
      </div>
    </div>
  );
};

// Sub-component for individual Appointment Logic
const AppointmentItem = ({ data }) => {
  const isConfirmed = data.status === 'confirmed';

  return (
    <div className="flex gap-3">
      {/* Timeline Icon */}
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-grow">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          
          {/* Card Header */}
          <div className="p-4 pb-2 flex justify-between items-start">
            <h3 className="font-semibold text-gray-800 text-lg">{data.type}</h3>
            <span className={`text-xs px-2 py-1 rounded-md font-medium ${
              isConfirmed 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {isConfirmed ? 'Confirmado' : 'Aguardando confirmação'}
            </span>
          </div>

          {/* Card Details */}
          <div className="px-4 py-2 space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <User className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{data.doctor}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm capitalize">{data.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{data.time}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{data.location}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 w-full mt-3 mb-3"></div>

          {/* Card Footer (Dynamic based on status) */}
          <div className="px-4 pb-4">
            {isConfirmed ? (
              <div className="flex justify-center items-center gap-2 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Você confirmou presença</span>
              </div>
            ) : (
              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition">
                  <CheckCircle2 className="w-4 h-4" />
                  Confirmar
                </button>
                <button className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition">
                  <XCircle className="w-4 h-4" />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-gray-400 ml-1">{data.timestamp}</span>
      </div>
    </div>
  );
};

export default PatientAppointments;