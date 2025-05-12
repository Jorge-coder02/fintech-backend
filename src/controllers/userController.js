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

    // Verificar si el usuario existe
    const userExists = await User.findOne({ email });
    // ❌ email
    if (!userExists) {
      return res.status(401).json({
        success: false,
        error: "El email no existe en la base de datos",
      });
    }
    // Verificar si la contraseña es correcta
    const passwordMatch = await User.findOne({
      email,
      password,
    });
    // ❌ password
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "La contraseña es incorrecta" });
    }
    // ✅ Bien
    else {
      const token = "tokenJWT"; // Aquí generar un token JWT real
      res.status(201).json({ success: true, data: token });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
