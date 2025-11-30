import dotenv from "dotenv";
dotenv.config();

import sequelize from "../config/database.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

async function seedNotificationsFromUsers() {
  try {
    console.log("🌱 Starting Notification seeding based on Users...");

    // 1. Testa conexão
    await sequelize.authenticate();
    console.log("✅ Database connected.");

    // 2. Busca apenas usuários PACIENTE com CPF definido
    const users = await User.findAll({
      where: {
        role: "PACIENTE",
        cpf: { [sequelize.Sequelize.Op.ne]: null },
      },
    });

    console.log(`👥 Found ${users.length} PACIENTE users with CPF to process.`);

    let createdCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      const cpf = user.cpf;

      // 3. Verifica se já existe alguma Notification para esse CPF
      const existingNotification = await Notification.findOne({
        where: { cpf },
      });

      if (existingNotification) {
        console.log(
          `⚠️  Skipping notification for ${user.full_name} (CPF: ${cpf}) - Notification already exists (ID: ${existingNotification.id}).`
        );
        skippedCount++;
        continue;
      }

      // 4. Cria uma notificação base
      const notification = await Notification.create({
        idGercon: null,
        consultType: null,
        startDateTime: null,
        endDateTime: null,
        cpf: cpf,
        medicName: null,
        especiality: null,
        // valor default do model: "PENDING"
        scheduleStatus: "AGENDADA", // <- ajuste aqui se quiser outro status inicial
      });

      console.log(
        `✅ Created Notification for ${user.full_name} (CPF: ${cpf}) [Notification ID: ${notification.id}]`
      );
      createdCount++;
    }

    console.log("\n🏁 Notification seeding completed!");
    console.log(`   ➕ Created: ${createdCount}`);
    console.log(`   ⏭️  Skipped (already existed): ${skippedCount}`);
  } catch (err) {
    console.error("❌ Error during Notification seeding:", err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

seedNotificationsFromUsers();
