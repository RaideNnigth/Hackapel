// src/services/pelotasInformesService.js
import axios from "axios";
import * as cheerio from "cheerio";

const PELOTAS_INFORMES_URL = "https://pelotas.com.br/listar-informes";

/**
 * Converte "08/10/2025" -> "2025-10-08"
 */
function parseBrDateToISO(brDateStr) {
  if (!brDateStr) return null;

  const match = brDateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return null;

  const [_, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Faz o scrape da página de informes da Prefeitura de Pelotas.
 * Retorna um array de objetos:
 * [
 *   {
 *     category: "Saúde",
 *     title: "Ubai Navegantes vacina com reforço para meningite nos fins de semana",
 *     publishedDate: "2025-10-08",
 *     rawDate: "08/10/2025",
 *     groupLabel: "Último Mês" // texto do grupo (opcional)
 *   },
 *   ...
 * ]
 */
export async function fetchPelotasInformes() {
  try {
    const response = await axios.get(PELOTAS_INFORMES_URL, {
      headers: {
        "User-Agent": "HackapelBot/1.0 (+https://hackapel.local)",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const informes = [];

    // Procura dentro do container principal somente grupos preenchidos
    $(".container-principal .filtro-grupo[data-preenchido='true']").each(
      (i, groupEl) => {
        const $group = $(groupEl);

        // Ex: "Último Mês", "2025", etc.
        const groupLabel = $group.find(".filter-line span").first().text().trim();

        // Para cada card de informe
        $group.find(".informes-item").each((j, itemEl) => {
          const $item = $(itemEl);

          // Categoria (h6)
          let category = $item
            .find(".informes-content-header h6")
            .text()
            .trim();

          // Remove dois-pontos no final, se houver (ex: "Saúde:" -> "Saúde")
          category = category.replace(/:\s*$/, "");

          // Título (p dentro de .informes-content-body)
          const title = $item
            .find(".informes-content-body p")
            .text()
            .replace(/\s+/g, " ")
            .trim();

          // Texto do rodapé onde está a data
          const footerText = $item
            .find(".informes-content-footer p")
            .text()
            .replace(/\s+/g, " ")
            .trim();

          // Pega só a data dd/mm/aaaa
          const dateMatch = footerText.match(/(\d{2}\/\d{2}\/\d{4})/);
          const rawDate = dateMatch ? dateMatch[1] : null;
          const publishedDate = parseBrDateToISO(rawDate);

          informes.push({
            category,
            title,
            publishedDate,
            rawDate,
            groupLabel,
          });
        });
      }
    );

    // Cut just to 3 elements for testing purposes
    informes.splice(3);
    
    return informes;
  } catch (error) {
    console.error("Erro ao buscar informes de Pelotas:", error);
    return [];
  }
}
