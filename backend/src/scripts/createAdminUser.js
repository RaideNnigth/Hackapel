import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";
import User from "../models/User.js"; // Adjust path if necessary based on your folder structure

const USERS_TO_SEED = [
  // 1. ADMIN USER (The one you already had)
  {
    role: "ADMIN",
    full_name: "Admin Master",
    email: "admin@hackapel.local",
    plainPassword: "Admin123!",
    cpf: "00011122233",
    cnes: null,
    cns: null,
    phone_number: "5553999999999",
  },
  
  // 2. PATIENT 1
  {
    role: "PACIENTE",
    full_name: "João da Silva",
    email: "joao.paciente@example.com",
    plainPassword: "User123!",
    cpf: "11122233344", // 11 digits
    cnes: null, 
    cns: "123456789012345", // 15 digits
    phone_number: "5553988888888",
    address_street: "Rua das Flores",
    address_number: "123",
    address_neighborhood: "Centro",
    address_city: "Pelotas",
    address_state: "RS",
    address_zipcode: "96000000",
  },

  // 3. PATIENT 2
  {
    role: "PACIENTE",
    full_name: "Maria Oliveira",
    email: "maria.paciente@example.com",
    plainPassword: "User123!",
    cpf: "55566677788",
    cnes: null,
    cns: "987654321098765",
    phone_number: "5553977777777",
    address_street: "Av. Bento Gonçalves",
    address_number: "456",
    address_neighborhood: "Fragata",
    address_city: "Pelotas",
    address_state: "RS",
    address_zipcode: "96000111",
  },

  // 4. OFICIAL ADMINISTRATIVO
  {
    role: "OFICIAL ADMINISTRATIVO",
    full_name: "Carlos Oficial",
    email: "carlos.oficial@hackapel.local",
    plainPassword: "Admin123!",
    cpf: "99988877766",
    cnes: null,
    cns: null,
    phone_number: "5553966666666",
  },

  // 5. HOSPITAL/LAB (Note: Uses CNES, usually no CPF)
  {
    role: "HOSPITAL/LAB",
    full_name: "Hospital Santa Casa Geral",
    email: "contato@santacasa.local",
    plainPassword: "Hospital123!",
    cpf: null, // Entities usually don't have CPF
    cnes: "7654321", // 7 digits usually, allowed string
    cns: null,
    address_street: "Praça Piratinino de Almeida",
    address_number: "10",
    address_city: "Pelotas",
    address_state: "RS",
    address_zipcode: "96015000",
  },

  // 6. UBS (Unidade Básica de Saúde)
  {
    role: "UBS",
    full_name: "UBS Navegantes",
    email: "ubs.navegantes@hackapel.local",
    plainPassword: "Ubs123!",
    cpf: null,
    cnes: "2233445", 
    cns: null,
    phone_number: "555332221111",
    address_street: "Rua Darcy Vargas",
    address_number: "212",
    address_neighborhood: "Navegantes",
    address_city: "Pelotas",
    address_state: "RS",
    address_zipcode: "96000222",
  }
];

async function seed() {
  try {
    console.log("🌱 Starting Database Seed...");

    // Authenticate connection first
    await sequelize.authenticate();
    console.log("✅ Database connected.");

    for (const userData of USERS_TO_SEED) {
      // Check if user exists by Email OR CPF (if cpf is present) OR CNES (if cnes is present)
      const whereClause = [];
      whereClause.push({ email: userData.email });
      if (userData.cpf) whereClause.push({ cpf: userData.cpf });
      if (userData.cnes) whereClause.push({ cnes: userData.cnes });

      const existingUser = await User.findOne({
        where: {
          [sequelize.Sequelize.Op.or]: whereClause
        }
      });

      if (existingUser) {
        console.log(`⚠️  Skipping: ${userData.full_name} (${userData.role}) - Already exists.`);
        continue;
      }

      // Hash password
      const password_hash = await bcrypt.hash(userData.plainPassword, 10);

      // Create User
      // We extract plainPassword to separate it from the creation object
      const { plainPassword, ...userCreationData } = userData;

      const newUser = await User.create({
        ...userCreationData,
        password_hash,
        is_active: true,
      });

      console.log(`✅ Created: ${newUser.full_name} [${newUser.role}]`);
    }

    console.log("\n🏁 Seeding completed successfully!");
    
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

seed();