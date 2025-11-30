import cron from "node-cron";
import Notification from "../models/Notification.js";

// --- Mock do Serviço de Envio (Substitua pela sua lógica real de Email/SMS/Push) ---
const sendExternalNotification = async (notificationData) => {
  // Simulação de delay de rede
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula 10% de chance de erro para testar o status ERROR
      const success = Math.random() > 0.1; 
      
      if (success) {
        console.log(`[ENVIO] Notificação enviada para CPF: ${notificationData.cpf}`);
        resolve(true);
      } else {
        reject(new Error("Falha de conexão com provedor de envio."));
      }
    }, 500);
  });
};

/**
 * Função principal que processa a fila
 */
export const processPendingNotifications = async () => {
  console.log("--- Iniciando Job de Notificações ---");

  try {
    // 1. Busca apenas as pendentes
    const pendingNotifications = await Notification.findAll({
      where: {
        notificationStatus: "PENDING",
      },
      limit: 50, // Importante: Limitar para não sobrecarregar a memória em processamentos grandes
    });

    if (pendingNotifications.length === 0) {
      console.log("Nenhuma notificação pendente encontrada.");
      return;
    }

    console.log(`Encontradas ${pendingNotifications.length} notificações pendentes.`);

    // 2. Itera sobre cada notificação
    for (const notification of pendingNotifications) {
      try {
        // Tenta enviar
        await sendExternalNotification({
          cpf: notification.cpf,
          medicName: notification.medicName,
          date: notification.startDateTime,
          status: notification.scheduleStatus
        });

        // 3a. Se sucesso, atualiza para SENT
        notification.notificationStatus = "SENT";
        await notification.save();
        
      } catch (error) {
        // 3b. Se erro, atualiza para ERROR e loga o motivo
        console.error(`Erro ao enviar notificação ID ${notification.id}:`, error.message);
        
        notification.notificationStatus = "ERROR";
        // Opcional: Você poderia adicionar um campo 'retryCount' no modelo para tentar novamente depois
        await notification.save();
      }
    }

  } catch (err) {
    console.error("Erro fatal no Job de Notificações:", err);
  } finally {
    console.log("--- Fim do processamento do Job ---");
  }
};

/**
 * Inicializa o Cron Job
 * Exemplo: Roda a cada 1 minuto
 */
export const startNotificationJob = () => {
  // Notificação a cada 8 horas"
  // cron.schedule("0 */8 * * *", () => {
  
    // Notificação a cada 1 minuto (PRA TESTAR AS NOTIFICAÇÕES)
    cron.schedule("*/1 * * * *", () => {
    processPendingNotifications();
  });
  
  console.log(">>> Job de Notificações agendado (Verificação a cada 1 min).");
};