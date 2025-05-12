const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes"); // Importar las rutas de usuario
const { MONGODB_URI } = process.env;

const app = express();

// Middlewares
app.use(cors());
app.use(
  cors({
    origin: "https://growbit.netlify.app",
    credentials: true, // Permite cookies
  })
);
app.use(express.json());

// Rutas
app.use("/api", userRoutes); // Prefijo para todas las rutas del backend

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// Rutas
app.get("/", (req, res) => {
  res.send("🚀API FinTech en funcionamiento");
});

module.exports = app;
