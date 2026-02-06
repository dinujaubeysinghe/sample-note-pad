import express from "express";
import * as noteController from "../controllers/noteController.js";

const router = express.Router();

// GET /api/notes - Get all notes
router.get("/", noteController.getAllNotes);

// GET /api/notes/:id - Get a single note by ID
router.get("/:id", noteController.getNoteById);

// POST /api/notes - Create a new note
router.post("/", noteController.createNote);

// PUT /api/notes/:id - Update a note
router.put("/:id", noteController.updateNote);

// DELETE /api/notes/:id - Delete a note
router.delete("/:id", noteController.deleteNote);

export default router;
