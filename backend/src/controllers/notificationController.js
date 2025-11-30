import Notification from "../models/Notification.js";

/**
 * Create notification
 * Json body example:
 * {
 *   "idGercon": "string",            // Optional
 *   "consultType": "string",
 *   "startDateTime": "2024-10-10T10:00:00Z",
 *   "endDateTime": "2024-10-10T11:00:00Z",
 *   "cpf": "string",                 // Mandatory
 *   "medicName": "string",
 *   "especiality": "string",
 *   "scheduleStatus": "string"       // Mandatory
 * }
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

    if (!cpf || !scheduleStatus) {
      return res.status(400).json({
        message: "Mandatory fields: cpf, scheduleStatus",
      });
    }

    const notification = await Notification.create({
      idGercon,
      consultType,
      startDateTime: startDateTime ? new Date(startDateTime) : null,
      endDateTime: endDateTime ? new Date(endDateTime) : null,
      cpf,
      medicName,
      especiality,
      scheduleStatus,
    });

    return res.status(201).json(notification);
  } catch (err) {
    console.error("Error creating notification:", err);

    return res.status(500).json({
      message: "Error creating notification",
      error: err.message,
    });
  }
};

/**
 * List all notifications, used for admin purposes
 */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.json(notifications);
  } catch (err) {
    console.error("Error searching for notifications:", err);
    return res.status(500).json({
      message: "Error searching for notifications:",
      error: err.message,
    });
  }
};

/**
 * Get notification by CPF
 * Example Json:
 * {
 *  "cpf": "12345678900"
 * }
 */
export const getNotificationByCPF = async (req, res) => {
  try {
    const { cpf } = req.params;
    const notification = await Notification.findOne({ where: { cpf } });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.json(notification);
  } catch (err) {
    console.error("Error searching for notification:", err);
    return res.status(500).json({
      message: "Error searching for notification:",
      error: err.message,
    });
  }
};

/**
 * Update scheduleStatus of a notification
 */
export const updateScheduleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduleStatus } = req.body;

    if (!scheduleStatus) {
      return res.status(400).json({
        message: "The field scheduleStatus is mandatory.",
      });
    }

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    notification.scheduleStatus = scheduleStatus;
    await notification.save();

    return res.json({
      message: "scheduleStatus updated successfully.",
      notification,
    });
  } catch (err) {
    console.error("Error updating scheduleStatus:", err);
    return res.status(500).json({
      message: "Error updating scheduleStatus",
      error: err.message,
    });
  }
};

/**
 * Delete notification by ID
 */
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.json({ message: "Notification removed successfully" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    return res.status(500).json({
      message: "Error deleting notification",
      error: err.message,
    });
  }
};
