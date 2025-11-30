// public/service-worker.js

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const title = data.title || "Nova notificação";
  const body = data.body || "";
  const options = {
    body,
    data: data.data || {},
    icon: "/icons/icon-192.png", // opcional, ajusta pro teu projeto
    badge: "/icons/icon-192.png", // opcional
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen =
    (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsArr) => {
      // Se já tem uma aba aberta, foca nela
      const hadWindow = clientsArr.some((client) => {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.focus();
          return true;
        }
        return false;
      });

      // Se não, abre nova aba
      if (!hadWindow && clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});