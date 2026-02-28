import express from "express";
import * as noteController from "../controllers/noteController.js";

const router = express.Router();

app.get("/", (req, res) => {
  res.send("Notes API is running on port 6501");
});

app.post("/", (req, res) => {
  res.status(201).send("Notes created successfully");
});

app.put("/", (req, res) => {
  res.status(200).send("Notes updated successfully");
});

app.delete("/", (req, res) => {
  res.status(200).send("Notes deleted successfully");
});


export default router;
