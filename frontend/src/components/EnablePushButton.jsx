import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { registerPushNotifications } from "../services/pushNotificationService";

export function EnablePushButton({ token }) {
  const [isVisible, setIsVisible] = useState(false);
  const [permissionState, setPermissionState] = useState(Notification.permission);

  useEffect(() => {
    // Só mostra o banner se a permissão for 'default' (ainda não perguntou)
    // Se for 'granted' (já tem) ou 'denied' (bloqueou), não mostra.
    if (Notification.permission === "default") {
      setIsVisible(true);
    }
  }, []);

  const handleEnablePush = async () => {
    try {
      // Aqui ocorre o "User Gesture" (clique), então o navegador permite o popup
      await registerPushNotifications(token);
      setPermissionState(Notification.permission);
      setIsVisible(false); // Esconde o banner após aceitar
    } catch (err) {
      console.error("Erro ao ativar notificações:", err);
      alert("Não foi possível ativar as notificações. Verifique as permissões do navegador.");
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Opcional: Salvar no localStorage que o usuário não quer ver isso por um tempo
  };

  // Se não estiver visível ou já tiver permissão, não renderiza nada
  if (!isVisible || permissionState === "granted") return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1 sm:mt-0">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-900 text-sm md:text-base">
            Ative as notificações
          </h3>
          <p className="text-blue-700 text-xs md:text-sm mt-1">
            Receba avisos sobre seus agendamentos e novidades do PeloSUS diretamente no seu dispositivo.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={handleDismiss}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-2 transition-colors"
        >
          Agora não
        </button>
        <button
          onClick={handleEnablePush}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors flex-1 sm:flex-none whitespace-nowrap"
        >
          Ativar Notificações
        </button>
      </div>
    </div>
  );
}