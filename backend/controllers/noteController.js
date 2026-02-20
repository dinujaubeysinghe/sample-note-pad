import * as notesStore from "../data/notesStore.js";

export function getAllNotes(req, res) {
  try {
    const notes = notesStore.getAllNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}

export function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const note = notesStore.getNoteById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
}

export function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = notesStore.createNote(title, content);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
}

export function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = notesStore.updateNote(id, title, content);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
}

export function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deleted = notesStore.deleteNote(id);
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}