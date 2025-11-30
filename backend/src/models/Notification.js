import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // idAgenda do GERCON (Número(19))
    idGercon: {
      type: DataTypes.BIGINT, // ou DataTypes.DECIMAL(19, 0)
      unique: true,
      allowNull: true,
      field: "id_gercon", // opcional: nome da coluna no banco
    },

    // tipoConsulta: PRIMEIRA | RETORNO | ESPONTANEA
    consultType: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "consult_type",
      validate: {
        isIn: [["PRIMEIRA", "RETORNO", "ESPONTANEA"]],
      },
    },

    // Datas da agenda (converta do unix ms para Date antes de salvar)
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "start_date_time",
    },

    endDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "end_date_time",
    },

    // CPF do paciente (ou médico) – eu NÃO deixaria unique,
    // pq a mesma pessoa pode ter várias notificações
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      // unique: true, // cuidado com isso!
      validate: {
        isNumeric: true,
        len: [11, 11],
      },
    },

    medicName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "medic_name",
    },

    // Pode ser o código (286986) ou o nome "Endocrinologia Adulto"
    especiality: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "especiality",
    },

    // situacao da agenda no GERCON
    // AGENDA_CONFIRMADA, TRANSFERIDA, AGENDADA, REALIZADA, FALTANTE, LIVRE, CANCELADA, BLOQUEADA, AGENDA_CONFIRMADA
    scheduleStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "schedule_status",
      validate: {
        isIn: [[
          "AGENDA_CONFIRMADA",
          "TRANSFERIDA",
          "AGENDADA",
          "REALIZADA",
          "FALTANTE",
          "LIVRE",
          "CANCELADA",
          "BLOQUEADA",
          "AGENDA_CONFIRMADA" // sim, a doc cita duplicado
        ]],
      },
    },

    // (opcional) status interno da notificação
    // PENDING = detectado mas ainda não notificado
    // SENT = já notificado
    // ERROR = tentativa falhou
    notificationStatus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "PENDING",
      field: "notification_status",
      validate: {
        isIn: [["PENDING", "SENT", "ERROR"]],
      },
    },
  },
  {
    tableName: "notifications",
    timestamps: true, // createdAt / updatedAt
  }
);

export default Notification;
