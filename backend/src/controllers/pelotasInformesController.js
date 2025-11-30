// src/controllers/pelotasInformesController.js
import { fetchPelotasInformes } from "../services/pelotasInformesService.js";

export async function getPelotasInformes(req, res, next) {
  try {
    const informes = await fetchPelotasInformes();

    return res.json({
      source: "https://pelotas.com.br/listar-informes",
      count: informes.length,
      informes,
    });
  } catch (error) {
    console.error("Error fetching Pelotas informes:", error.message);

    // Você pode customizar esse retorno conforme o padrão do Hackapel
    return res.status(500).json({
      message: "Erro ao buscar informes da Prefeitura de Pelotas.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
