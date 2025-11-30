// src/services/pelotasInformesSyncService.js
import PostToSend from "../models/PostToSend.js";
import { fetchPelotasInformes } from "../services/pelotasInformesService.js";

/**
 * Sincroniza os informes da Prefeitura de Pelotas com a tabela posts_to_send.
 * - Cria posts do tipo "informative"
 * - Evita duplicar pelo postTitle + typeOfPost
 */
export async function syncPelotasInformesToPosts() {
  const informes = await fetchPelotasInformes();

  const createdPosts = [];
  const skippedPosts = [];

  for (const info of informes) {
    const { category, title, rawDate, groupLabel } = info;

    // Verifica se já existe um post com esse título e tipo
    const existing = await PostToSend.findOne({
      where: {
        postTitle: title,
        typeOfPost: "informative",
      },
    });

    if (existing) {
      skippedPosts.push({ title, reason: "already_exists" });
      continue;
    }

    const postTitle = title;

    // Pequenha descrição com categoria + data
    let postDescription = null;
    if (category && rawDate) {
      postDescription = `${category} - ${rawDate}`;
    } else if (category) {
      postDescription = category;
    } else if (rawDate) {
      postDescription = `Publicado em ${rawDate}`;
    }

    // Corpo do post (por enquanto só texto simples, pode melhorar depois)
    const lines = [];
    lines.push(title);
    if (category) lines.push(`Categoria: ${category}`);
    if (rawDate) lines.push(`Data de Publicação: ${rawDate}`);
    if (groupLabel) lines.push(`Grupo: ${groupLabel}`);

    const postBody = lines.join("\n");

    const newPost = await PostToSend.create({
      postTitle,
      postDescription,
      postBody,
      postImages: null, // no futuro dá pra tentar pegar imagem do site
      typeOfPost: "informative",
      // notificationStatus fica como "PENDING" pelo default do modelo
    });

    createdPosts.push(newPost);
  }

  return {
    createdCount: createdPosts.length,
    skippedCount: skippedPosts.length,
    createdPosts,
    skippedPosts,
  };
}
