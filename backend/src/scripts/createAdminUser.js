import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";
import User from "../models/User.js";

async function main() {
  try {
    const full_name = "Admin Master";
    const email = "admin@hackapel.local";
    const plainPassword = "Admin123!";
    const cpf = "00011122233";
    const cnes = "1234567987";

    // Only create if no ADMIN exists
    const existingAdmin = await User.findOne({ where: { role: "ADMIN" } });
    if (existingAdmin) {
      console.log("Já existe um ADMIN cadastrado:");
      console.log({
        id: existingAdmin.id,
        full_name: existingAdmin.full_name,
        cpf: existingAdmin.cpf,
        cnes: existingAdmin.cnes,
      });
      return;
    }

    const password_hash = await bcrypt.hash(plainPassword, 10);

    const adminUser = await User.create({
      full_name,
      email,
      password_hash,
      cpf,
      cnes,
      cns: null,
      phone_number: null,
      address_street: null,
      address_number: null,
      address_complement: null,
      address_neighborhood: null,
      address_city: null,
      address_state: null,
      address_zipcode: null,
      role: "ADMIN",
      is_active: true,
    });

    console.log("✅ ADMIN user created successfully:");
    console.log({
      id: adminUser.id,
      full_name: adminUser.full_name,
      email: adminUser.email,
      role: adminUser.role,
      cpf: adminUser.cpf,
      cnes: adminUser.cnes,
    });

    console.log("\n👉 Use these credentials to login as ADMIN:");
    console.log(`CPF:      ${cpf}`);
    console.log(`Password: ${plainPassword}`);
  } catch (err) {
    console.error("❌ Error creating ADMIN user:", err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

main();
