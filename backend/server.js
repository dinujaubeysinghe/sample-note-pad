import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 6501;



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);


// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  });
});


