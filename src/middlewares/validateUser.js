const { body } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateUser = [
  // Validación de campos con express-validator
  body("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es requerido")
    .isLength({ min: 3 })
    .withMessage("Mínimo 3 caracteres"),

  body("birthDate")
    .notEmpty()
    .withMessage("La fecha de nacimiento es requerida")
    .matches(/^\d{2}-\d{2}-\d{4}$/)
    .withMessage("Formato de fecha inválido (DD-MM-YYYY)"),

  // Middleware final que verifica errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next(); // Si no hay errores, pasa al controlador
  },
];
