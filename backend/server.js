import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();
const PORT = 6501;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Root route
app.get("/api/notes", (req, res) => {
  res.send("Notes API is running on port 6501");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});