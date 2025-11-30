// src/services/pushNotificationService.js
import { urlBase64ToUint8Array } from "../utils/urlBase64ToUint8Array";

// URL da API do backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Registra o service worker, pede permissão e registra o pushSubscription no backend.
 * @param {string} token - JWT do usuário logado (Auth Bearer)
 */
export async function registerPushNotifications(token) {
  if (!("serviceWorker" in navigator)) {
    console.warn("[PUSH] Service workers are not supported in this browser.");
    return;
  }

  if (!("PushManager" in window)) {
    console.warn("[PUSH] Push API not supported in this browser.");
    return;
  }

  // 1. Pede permissão de notificação
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("[PUSH] Notification permission not granted:", permission);
    return;
  }

  // 2. Registra o service worker
  const registration = await navigator.serviceWorker.register("/service-worker.js");
  console.log("[PUSH] Service worker registered:", registration);

  // 3. Busca VAPID public key do backend
  const vapidRes = await fetch(`${API_BASE_URL}/api/webpush/public-key`);
  const vapidJson = await vapidRes.json();

  if (!vapidRes.ok || !vapidJson.publicKey) {
    console.error("[PUSH] Failed to fetch VAPID public key:", vapidJson);
    return;
  }

  const applicationServerKey = urlBase64ToUint8Array(vapidJson.publicKey);

  // 4. Cria (ou reaproveita) a subscription
  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
  }

  const subscriptionJson = subscription.toJSON();
  console.log("[PUSH] Obtained subscription:", subscriptionJson);

  // 5. Envia subscription pro backend
  const res = await fetch(`${API_BASE_URL}/api/webpush/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscriptionJson),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("[PUSH] Failed to save subscription:", data);
    return;
  }

  console.log("[PUSH] Subscription saved on backend:", data);
}