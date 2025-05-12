const express = require("express");
const {
  createUser,
  infoUser,
  loginUser,
} = require("../controllers/userController");
const { validateUser } = require("../middlewares/validateUser"); // Importar middleware
const { validateLogin } = require("../middlewares/validateLogin"); // Importar middleware

const router = express.Router();

// GET
router.get("/info", infoUser);

// POST
router.post("/register", validateUser, createUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
