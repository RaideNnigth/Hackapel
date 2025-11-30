import Notification from "../models/Notification.js";

/**
 * Criar nova notificação
 */
export const createNotification = async (req, res) => {
  try {
    const {
      idGercon,
      consultType,
      startDateTime,
      endDateTime,
      cpf,
      medicName,
      especiality,
      scheduleStatus,
    } = req.body;

    if (!idGercon || !cpf || !scheduleStatus) {
      return res.status(400).json({
        message: "Campos obrigatórios: idGercon, cpf, scheduleStatus",
      });
    }

    const notification = await Notification.create({
      idGercon,
      consultType,
      startDateTime,
      endDateTime,
      cpf,
      medicName,
      especiality,
      scheduleStatus,
    });

    return res.status(201).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erro ao criar notificação",
      error: err.message,
    });
  }
};

/**
 * Listar todas as notificações
 */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao buscar notificações",
      error: err.message,
    });
  }
};

/**
 * Buscar por ID
 */
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao buscar notificação",
      error: err.message,
    });
  }
};

/**
 * Atualizar apenas o status da notificação
 */
export const updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduleStatus } = req.body;

    if (!scheduleStatus) {
      return res.status(400).json({
        message: "O campo scheduleStatus é obrigatório.",
      });
    }

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notificação não encontrada.",
      });
    }

    notification.scheduleStatus = scheduleStatus;

    await notification.save();

    return res.json({
      message: "Status atualizado com sucesso.",
      notification,
    });

  } catch (err) {
    console.error("Erro ao atualizar status:", err);
    res.status(500).json({
      message: "Erro ao atualizar status",
      error: err.message,
    });
  }
};

/**
 * Deletar notificação
 */
export const deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }

    res.json({ message: "Notificação removida com sucesso" });
  } catch (err) {
    res.status(500).json({
      message: "Erro ao deletar notificação",
      error: err.message,
    });
  }
};
