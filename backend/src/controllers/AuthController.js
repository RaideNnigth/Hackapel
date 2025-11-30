// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30m";

if (!JWT_SECRET) {
  console.warn("[AUTH WARNING] JWT_SECRET is not defined in environment variables.");
}

// Gera token JWT com base no tipo de usuário
function generateToken(user) {
  const payload = {
    id: user.id,
    role: user.role,
  };

  if (user.role === "UBS" || user.role === "HOSPITAL/LAB") {
    // UBS e Hospital/Lab → token carrega CNES
    payload.cnes = user.cnes;
  } else if (
    user.role === "ADMIN" ||
    user.role === "PACIENTE" ||
    user.role === "OFICIAL ADMINISTRATIVO"
  ) {
    // Admin, Paciente e Oficial Administrativo → token carrega CPF
    payload.cpf = user.cpf;
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// --------------------------------------------------------
// POST /auth/login
// Body exemplos:
//   UBS/HOSPITAL/LAB: { cnes: "1234567", password: "..." }
//   ADMIN/PACIENTE:   { cpf: "12345678901", password: "..." }
// --------------------------------------------------------
export async function login(req, res) {
  const { cpf, cnes, password } = req.body;

  if (!password || (!cpf && !cnes)) {
    return res.status(400).json({
      message: "Password and either CPF or CNES are required",
    });
  }

  try {
    let user = null;

    if (cnes) {
      // Login por CNES (UBS / HOSPITAL/LAB)
      user = await User.findOne({ where: { cnes } });

      if (
        !user ||
        (user.role !== "UBS" && user.role !== "HOSPITAL/LAB")
      ) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else if (cpf) {
      // Login por CPF (ADMIN / PACIENTE / OFICIAL ADMINISTRATIVO)
      user = await User.findOne({ where: { cpf } });

      if (
        !user ||
        !["ADMIN", "PACIENTE", "OFICIAL ADMINISTRATIVO"].includes(user.role)
      ) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "User is inactive" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.json({
      token,
      expiresIn: JWT_EXPIRES_IN,
      user: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        cpf: user.cpf,
        cnes: user.cnes,
      },
    });
  } catch (err) {
    console.error("[AUTH LOGIN ERROR]", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// --------------------------------------------------------
// POST /auth/registerPaciente
// Body exemplo:
// {
//   "full_name": "João da Silva",
//   "email": "
// --------------------------------------------------------
export async function registerPaciente(req, res) {
  const {
    full_name,
    email,
    password,
    cpf,
    role = "PACIENTE",
    phone_number,
    address_street,
    address_number,
    address_complement,
    address_neighborhood,
    address_city,
    address_state,
    address_zipcode,
  } = req.body;

  // Minimum required fields
  if (!full_name || !password) {
    return res.status(400).json({
      message: "full_name and password are required",
    });
  }

  // CPF for PACIENTE is mandatory
  if (!cpf) {
    return res.status(400).json({ message: "CPF is required" });
  }

  try {
    // Uniqueness checks
    if (email) {
      const existingByEmail = await User.findOne({ where: { email } });
      if (existingByEmail) {
        return res.status(409).json({ message: "Email already registered" });
      }
    }

    const existingByCpf = await User.findOne({ where: { cpf } });
    if (existingByCpf) {
      return res.status(409).json({ message: "CPF already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email: email || null,
      password_hash,
      cpf,
      phone_number: phone_number || null,
      address_street: address_street || null,
      address_number: address_number || null,
      address_complement: address_complement || null,
      address_neighborhood: address_neighborhood || null,
      address_city: address_city || null,
      address_state: address_state || null,
      address_zipcode: address_zipcode || null,
      role,
      is_active: true,
    });

    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        cpf: user.cpf,
      },
    });
  } catch (err) {
    console.error("[AUTH REGISTER ERROR]", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// --------------------------------------------------------
// POST /auth/registerUser
// Só pode ser usado por ADMIN autenticado (JWT válido)
// Exemplo de uso (ADMIN criando um UBS):
// {
//   "full_name": "Clínica X",
//   "email": "contato@clinicax.com",
//   "password": "SenhaSegura123",
//   "cpf": "12345678901",
//   "cnes": "1234567",
//   "role": "UBS",
//   "phone_number": "51999999999",
//   "address_street": "Rua A",
//   "address_number": "123",
//   "address_city": "Pelotas",
//   "address_state": "RS",
//   "address_zipcode": "96000000"
// }
// --------------------------------------------------------
export async function registerUser(req, res) {
  // 1) Check if token is valid and present (authMiddleware já fez isso)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // 2) Check if token belongs to an ADMIN user
  if (!decoded.role || decoded.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Only ADMIN tokens can create users" });
  }

  // 3) Check if ADMIN user is active and still a ADMIN
  const adminUser = await User.findByPk(decoded.id);
  if (!adminUser || adminUser.role !== "ADMIN" || !adminUser.is_active) {
    return res
      .status(403)
      .json({ message: "Only active ADMIN users can create users" });
  }

  // 4) Proceed to create the new user
  const {
    full_name,
    email,
    password,
    cpf,
    cnes,
    role,
    cns,
    phone_number,
    address_street,
    address_number,
    address_complement,
    address_neighborhood,
    address_city,
    address_state,
    address_zipcode,
    is_active = true,
  } = req.body;

  // Minimum required fields
  if (!full_name || !password) {
    return res.status(400).json({
      message: "full_name and password are required",
    });
  }

  if (!cpf) {
    return res.status(400).json({ message: "CPF is required" });
  }
  if (!cnes) {
    return res.status(400).json({ message: "CNES is required" });
  }

  // Validate role
  const allowedRoles = [
    "ADMIN",
    "UBS",
    "PACIENTE",
    "OFICIAL ADMINISTRATIVO",
    "HOSPITAL/LAB",
  ];
  const finalRole = allowedRoles.includes(role) ? role : "PACIENTE";

  try {
    // Uniqueness checks
    if (email) {
      const existingByEmail = await User.findOne({ where: { email } });
      if (existingByEmail) {
        return res.status(409).json({ message: "Email already registered" });
      }
    }

    const existingByCpf = await User.findOne({ where: { cpf } });
    if (existingByCpf) {
      return res.status(409).json({ message: "CPF already registered" });
    }

    const existingByCnes = await User.findOne({ where: { cnes } });
    if (existingByCnes) {
      return res.status(409).json({ message: "CNES already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email: email || null,
      password_hash,
      cpf,
      cnes,
      cns: cns || null,
      phone_number: phone_number || null,
      address_street: address_street || null,
      address_number: address_number || null,
      address_complement: address_complement || null,
      address_neighborhood: address_neighborhood || null,
      address_city: address_city || null,
      address_state: address_state || null,
      address_zipcode: address_zipcode || null,
      role: finalRole,
      is_active,
    });

    const newUserToken = generateToken(user);

    return res.status(201).json({
      message: "User created successfully",
      token: newUserToken,
      user: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        cpf: user.cpf,
        cnes: user.cnes,
        is_active: user.is_active,
      },
    });
  } catch (err) {
    console.error("[AUTH REGISTER USER ERROR]", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
