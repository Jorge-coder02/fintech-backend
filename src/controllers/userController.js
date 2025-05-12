const User = require("../models/UserFintech");
// const axios = require("axios");

// Info de usuarios
exports.infoUser = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const users = await User.find({});

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Creación de un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { email, password, username, birthDate } = req.body;
    const [day, month, year] = birthDate.split("-");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const user = new User({
      email,
      password,
      username,
      birthDate: formattedDate,
    });
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Login de un usuario
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. ❌ Verificar si el usuario existe
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(401).json({
        success: false,
        error: "El email no existe en la base de datos",
      });
    }
    // 2. Comparar contraseñas
    const passwordMatch = await User.findOne({
      email,
      password,
    });
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "La contraseña es incorrecta" });
    }

    // 3. ✅ Generar token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "45m", // Access token de corta duración
    });
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JS
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "strict", // Protección contra CSRF
      maxAge: 45 * 60 * 1000, // 45 minutos (mismo tiempo que el JWT)
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
