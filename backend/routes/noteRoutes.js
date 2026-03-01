import express from "express";
import * as noteController from "../controllers/noteController.js";

const router = express.Router();

router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.post("/",noteController.createNotes);
router.put("/:id",noteController.updateNotes);
router.delete("/:id", noteController.deleteNotes);


export default router;
