// src/controllers/webPushController.js
import WebPushSubscription from "../models/WebPushSubscription.js";

/**
 * GET /api/webpush/public-key
 * Devolve a VAPID public key para o frontend usar no pushManager.subscribe
 */
export function getVapidPublicKey(req, res) {
  const publicKey = process.env.VAPID_PUBLIC_KEY;

  if (!publicKey) {
    return res.status(500).json({
      error: "VAPID_PUBLIC_KEY is not configured in environment variables",
    });
  }

  return res.status(200).json({ publicKey });
}

/**
 * POST /api/webpush/subscribe
 * Salva (ou atualiza) uma subscription WebPush para o usuário logado.
 * Espera no body algo como:
 * {
 *   endpoint: "...",
 *   expirationTime: null,
 *   keys: {
 *     p256dh: "...",
 *     auth: "..."
 *   }
 * }
 */
export async function subscribeWebPush(req, res) {
  try {
    const userId = req.user?.id; // vindo do authMiddleware

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: user not found in token" });
    }

    const { endpoint, expirationTime, keys } = req.body || {};

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return res.status(400).json({
        error: "Invalid subscription payload. endpoint, keys.p256dh and keys.auth are required.",
      });
    }

    // Verifica se já existe subscription com esse endpoint
    let subscription = await WebPushSubscription.findOne({
      where: { endpoint },
    });

    if (subscription) {
      // Atualiza userId e keys (caso tenha mudado)
      subscription.userId = userId;
      subscription.expirationTime = expirationTime || null;
      subscription.p256dh = keys.p256dh;
      subscription.auth = keys.auth;
      await subscription.save();
    } else {
      // Cria novo
      subscription = await WebPushSubscription.create({
        userId,
        endpoint,
        expirationTime: expirationTime || null,
        p256dh: keys.p256dh,
        auth: keys.auth,
      });
    }

    return res.status(201).json({
      message: "WebPush subscription saved successfully",
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error("[WEBPUSH] Error subscribing:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
