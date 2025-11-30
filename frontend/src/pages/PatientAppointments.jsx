import React, { useState } from 'react';
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
  // We use State now so the UI can update when you click buttons
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: "Cardiologia",
      doctor: "Dr. João Silva",
      date: "05 de dezembro de 2025",
      time: "14:30",
      location: "UBS Central - Sala 3",
      status: "confirmed", // This one starts confirmed
      timestamp: "25/11, 10:30",
      showReminder: true // Already confirmed, so show reminder
    },
    {
      id: 2,
      type: "Ortopedia", // The new example from your image
      doctor: "Dr. Pedro Costa",
      date: "15 de dezembro de 2025",
      time: "16:00",
      location: "Hospital Municipal - 2º Andar",
      status: "pending", // Starts pending so you can test the interaction!
      timestamp: "29/11, 09:20",
      showReminder: false
    }
  ]);

  // Function to handle the "Confirmar" click
  const handleConfirm = (id) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: 'confirmed', showReminder: true };
      }
      return apt;
    }));
  };

  // Function to handle the "Cancelar" click
  const handleCancel = (id) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: 'cancelled', showReminder: false };
      }
      return apt;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center font-sans">

      <div className="w-full max-w-5xl bg-[#EEF2F6] min-h-screen md:min-h-0 md:my-8 md:rounded-2xl md:shadow-xl overflow-hidden flex flex-col relative pb-12">

        {/* Header */}
        <header className="bg-white p-4 md:p-6 flex items-center gap-4 shadow-sm z-10 sticky top-0 md:static">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="bg-blue-600 p-2 rounded-full">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900 leading-tight">PeloSUS</h1>
            <p className="text-sm text-gray-500">Seus agendamentos</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-8 flex flex-col gap-8 flex-1">

          {/* Intro Message */}
          <div className="flex gap-4 fade-in">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-1 max-w-[90%] md:max-w-2xl">
              <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm text-gray-700 leading-relaxed text-sm md:text-base">
                Olá! 👋 Aqui estão seus agendamentos confirmados e pendentes.
                Você pode confirmá-los ou cancelá-los diretamente.
              </div>
              <span className="text-xs text-gray-400 ml-1">Agora</span>
            </div>
          </div>

          {/* Appointment Cards Loop */}
          <div className="space-y-8">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex flex-col gap-4">
                {/* The Appointment Card */}
                <AppointmentItem
                  data={apt}
                  onConfirm={() => handleConfirm(apt.id)}
                  onCancel={() => handleCancel(apt.id)}
                />

                {/* The Blue Reminder Message (Conditionally Rendered) */}
                {apt.showReminder && (
                  <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 max-w-[90%] md:max-w-2xl">
                      <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl rounded-tl-none shadow-sm text-blue-900 leading-relaxed text-sm md:text-base">
                        💡 Lembre-se de comparecer com 15 minutos de antecedência e trazer documento com foto e cartão SUS.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-gray-400 text-sm border-t border-gray-200/50 bg-[#EEF2F6]">
          PeloSUS - Atendimento ao Paciente
        </footer>

      </div>
    </div>
  );
};

const AppointmentItem = ({ data, onConfirm, onCancel }) => {
  const isConfirmed = data.status === 'confirmed';
  const isCancelled = data.status === 'cancelled';

  if (isCancelled) return null; // Or render a simplified "Cancelled" view

  return (
    <div className="flex gap-3 md:gap-5 w-full">
      {/* Timeline Icon */}
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-grow min-w-0">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 w-full hover:shadow-md transition-shadow duration-200">

          {/* Card Header */}
          <div className="p-4 md:p-5 flex justify-between items-start bg-gray-50/50">
            <h3 className="font-bold text-gray-800 text-lg md:text-xl">{data.type}</h3>
            <span className={`text-xs md:text-sm px-3 py-1.5 rounded-md font-medium whitespace-nowrap ml-2 ${isConfirmed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
              }`}>
              {isConfirmed ? 'Confirmado' : 'Aguardando confirmação'}
            </span>
          </div>

          {/* Card Details */}
          <div className="px-4 py-3 md:px-6 md:py-5 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
            <div className="flex items-center gap-3 text-gray-600">
              <User className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm md:text-base font-medium">{data.doctor}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm md:text-base capitalize">{data.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm md:text-base">{data.time}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm md:text-base truncate">{data.location}</span>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full"></div>

          {/* Card Footer - Interactive Buttons */}
          <div className="p-4 md:p-5">
            {isConfirmed ? (
              <div className="flex justify-center md:justify-start items-center gap-2 text-green-600 animate-in fade-in duration-300">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm md:text-base font-medium">Você confirmou presença</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onConfirm}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm md:text-base font-medium flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  Confirmar
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 py-2.5 rounded-lg text-sm md:text-base font-medium flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  <XCircle className="w-4 h-4 md:w-5 md:h-5" />
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