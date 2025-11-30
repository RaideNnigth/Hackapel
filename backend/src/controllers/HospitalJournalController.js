import HospitalJournal from "../models/HospitalJournal.js";

/**
 * Create HospitalJournal entries
 * 
 * Json body example:
 * [
 *   {
 *     "prestador": "Clínica VidaBem",
 *     "endereco": "Rua das Flores, 120",
 *     "especialidade": "Cardiologia",
 *     "data": "2025-12-12",
 *     "horario": "14:30",
 *     "nome_profissional": "Dra. Ana Ribeiro"
 *   },
 *   {
 *     "prestador": "Hospital Central",
 *     "endereco": "Av. Brasil, 955",
 *     "especialidade": "Ortopedia",
 *     "data": "2025-12-13",
 *     "horario": "09:00",
 *     "nome_profissional": "Dr. Pedro Almeida"
 *   }
 * ]
 */
export const createHospitalJournal = async (req, res) => {
  try {
    const payload = req.body;

    console.log("Recebi essa bosta aq: ", payload);

    // Validate each item
    for (const entry of payload) {
      const {
        prestador,
        endereco,
        especialidade,
        data,
        horario,
        nome_profissional,
      } = entry;

      if (
        !prestador ||
        !endereco ||
        !especialidade ||
        !data ||
        !horario ||
        !nome_profissional
      ) {
        return res.status(400).json({
          message:
            "Each item must include: prestador, endereco, especialidade, data, horario, nome_profissional",
        });
      }
    }

    // Bulk creation
    const created = await HospitalJournal.bulkCreate(payload, {
      returning: true,
    });

    return res.status(201).json({
      message: "HospitalJournal entries created successfully.",
      records: created,
    });
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
