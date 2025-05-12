const { body } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateLogin = [
  // Validación de campos con express-validator
  body("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

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
