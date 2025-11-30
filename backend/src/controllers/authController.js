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

  // Dont allow missing fields
  if (!password || (!cpf && !cnes)) {
    return res.status(400).json({
      message: "Password and either CPF or CNES are required",
    });
  }

  // Dont allow both cpf and cnes together
  if (cpf && cnes) {
    return res.status(400).json({
      message: "Send either CPF or CNES, not both",
    });
  }

  try {
    let user = null;

    if (cnes) {
      // ------------------------------------------------
      // Login per CNES (UBS / HOSPITAL/LAB)
      // ------------------------------------------------
      user = await User.findOne({ where: { cnes } });

      const allowedRolesForCnes = ["UBS", "HOSPITAL/LAB"];

      if (!user || !allowedRolesForCnes.includes(user.role)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else if (cpf) {
      // ------------------------------------------------
      // Login per CPF (PACIENTE / OFICIAL ADMINISTRATIVO)
      // Admin only via /loginAdmin
      // ------------------------------------------------
      user = await User.findOne({ where: { cpf } });

      const allowedRolesForCpf = ["PACIENTE", "OFICIAL ADMINISTRATIVO"];

      if (!user || !allowedRolesForCpf.includes(user.role)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(403).json({ message: "User is inactive" });
    }

    // Pass check
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
// POST /auth/loginAdmin
// Body exemplos:
//   ADMIN:   { cpf: "12345678901", password: "..." }
// --------------------------------------------------------
export async function loginAdmin(req, res) {
  const { cpf, password } = req.body;

  if (!password || !cpf) {
    return res.status(400).json({
      message: "Password and CPF are required",
    });
  }

  try {
    const user = await User.findOne({ where: { cpf, role: "ADMIN" } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
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
// Body example:
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

  // 1) Minimum required fields
  if (!full_name || !password) {
    return res.status(400).json({
      message: "full_name and password are required",
    });
  }

  // 2) Validate role
  const allowedRoles = [
    "ADMIN",
    "UBS",
    "PACIENTE",
    "OFICIAL ADMINISTRATIVO",
    "HOSPITAL/LAB",
  ];

  const finalRole = allowedRoles.includes(role) ? role : "";

  if (!finalRole) {
    return res.status(400).json({
      message:
        "Valid role is required. They are: " + allowedRoles.join(", "),
    });
  }

  // 3) CPF and CNES validations

  // CPF mandatory for PACIENTE, ADMIN and OFICIAL ADMINISTRATIVO
  if (
    ["PACIENTE", "ADMIN", "OFICIAL ADMINISTRATIVO"].includes(finalRole) &&
    !cpf
  ) {
    return res
      .status(400)
      .json({ message: "CPF is required for this role" });
  }

  // CNES mandatory for UBS and HOSPITAL/LAB
  if (["UBS", "HOSPITAL/LAB"].includes(finalRole) && !cnes) {
    return res
      .status(400)
      .json({ message: "CNES is required for this role" });
  }

  try {
    // 4) Uniqueness checks

    if (email) {
      const existingByEmail = await User.findOne({ where: { email } });
      if (existingByEmail) {
        return res.status(409).json({ message: "Email already registered" });
      }
    }

    if (cpf) {
      const existingByCpf = await User.findOne({ where: { cpf } });
      if (existingByCpf) {
        return res.status(409).json({ message: "CPF already registered" });
      }
    }

    if (cnes) {
      const existingByCnes = await User.findOne({ where: { cnes } });
      if (existingByCnes) {
        return res.status(409).json({ message: "CNES already registered" });
      }
    }

    // 5) Paassword hashing
    const password_hash = await bcrypt.hash(password, 10);

    // 6) Create user
    const user = await User.create({
      full_name,
      email: email || null,
      password_hash,
      cpf: cpf || null,
      cnes: cnes || null,
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

    // 7) Generate token for the new user
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
