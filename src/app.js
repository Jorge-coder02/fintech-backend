const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes"); // Importar las rutas de usuario
const { MONGODB_URI } = process.env;

const app = express();

// Middleware CORS
const allowedOrigins = [
  "https://growbit.netlify.app",
  "http://localhost:5174",
  "http://localhost:3000",
];

app.use(cors());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Permite solicitudes sin origen (como apps móviles o curl)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = `El origen ${origin} no tiene permiso de acceso.`;
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//   })
// );
app.use(express.json());

// Rutas
app.use("/api", userRoutes); // Prefijo para todas las rutas del backend

// Conexión a MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// Rutas
app.get("/", (req, res) => {
  res.send("🚀API FinTech en funcionamiento");
});

module.exports = app;
