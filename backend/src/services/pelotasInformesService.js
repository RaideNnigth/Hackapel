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
 *     rawDate: "08/10/2025"
 *   },
 *   ...
 * ]
 */
export async function fetchPelotasInformes() {
  const response = await axios.get(PELOTAS_INFORMES_URL, {
    headers: {
      "User-Agent": "HackapelBot/1.0 (+https://hackapel.local)"
    },
  });

  const html = response.data;
  const $ = cheerio.load(html);

  const informes = [];

  // A estratégia:
  // - Procurar por <p> que tenham "Data de Publicação:"
  // - O <p> anterior é o título
  // - Um <h5>/<h6> acima é a categoria (Saúde, Campanha, etc.)
  $("p")
    .filter((_, el) => $(el).text().includes("Data de Publicação"))
    .each((_, el) => {
      const $dateP = $(el);
      const rawText = $dateP.text().trim(); // "Data de Publicação: 08/10/2025"
      const rawDate = rawText.replace("Data de Publicação:", "").trim();
      const publishedDate = parseBrDateToISO(rawDate);

      // Título costuma ser o <p> imediatamente anterior
      const title = $dateP.prev("p").text().trim();

      // Categoria costuma vir em um heading logo acima (h5/h6)
      let category =
        $dateP.prevAll("h6").first().text().trim() ||
        $dateP.prevAll("h5").first().text().trim() ||
        null;

      if (category) {
        // Remove ":" final, se tiver
        category = category.replace(/:\s*$/, "").trim();
      }

      // Só adiciona se tiver título
      if (title) {
        informes.push({
          category,
          title,
          publishedDate,
          rawDate,
        });
      }
    });

  return informes;
}
