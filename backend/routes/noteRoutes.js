import express from "express";
import * as noteController from "../controllers/noteController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Notes API is running on port 6501");
});

router.post("/", (req, res) => {
  res.status(201).send("Notes created successfully");
});

router.put("/", (req, res) => {
  res.status(200).send("Notes updated successfully");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("Notes deleted successfully");
});


export default router;
