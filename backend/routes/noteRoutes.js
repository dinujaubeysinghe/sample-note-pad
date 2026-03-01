import express from "express";
import * as noteController from "../controllers/noteController.js";

const router = express.Router();

router.get("/", noteController.getAllNotes);

router.post("/",noteController.createNotes);

router.put("/",noteController.updateNotes);

router.delete("/:id", noteController.deleteNotes);


export default router;
