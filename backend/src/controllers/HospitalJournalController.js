import HospitalJournal from "../models/HospitalJournal.js";

/**
 * Create HospitalJournal
 * Json body example:
 * {
 *   "prestador": "Clínica VidaBem",
 *   "endereco": "Rua das Flores, 120",
 *   "especialidade": "Cardiologia",
 *   "data": "2025-12-12",
 *   "horario": "14:30",
 *   "nome_profissional": "Dra. Ana Ribeiro"
 * }
 */
export const createHospitalJournal = async (req, res) => {
  try {
    const {
      prestador,
      endereco,
      especialidade,
      data,
      horario,
      nome_profissional,
    } = req.body;

    // Required fields
    if (!prestador || !endereco || !especialidade || !data || !horario || !nome_profissional) {
      return res.status(400).json({
        message:
          "Mandatory fields: prestador, endereco, especialidade, data, horario, nome_profissional",
      });
    }

    const HospitalJournal = await HospitalJournal.create({
      prestador,
      endereco,
      especialidade,
      data,
      horario,
      nome_profissional,
    });

    return res.status(201).json(HospitalJournal);
  } catch (err) {
    console.error("Error creating HospitalJournal:", err);
    return res.status(500).json({
      message: "Error creating HospitalJournal",
      error: err.message,
    });
  }
};

/**
 * List all HospitalJournals
 * Admin or internal use
 */
export const getHospitalJournals = async (req, res) => {
  try {
    const HospitalJournals = await HospitalJournal.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.json(HospitalJournals);
  } catch (err) {
    console.error("Error fetching HospitalJournals:", err);
    return res.status(500).json({
      message: "Error fetching HospitalJournals",
      error: err.message,
    });
  }
};
