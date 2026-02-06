import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "notes.json");

// Initialize or load notes from file
let notes = [];

function loadNotes() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    notes = JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      notes = [];
      saveNotes();
    } else {
      console.error("Error loading notes:", err.message);
      notes = [];
    }
  }
}

function saveNotes() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving notes:", err.message);
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getAllNotes() {
  loadNotes();
  return notes;
}

export function getNoteById(id) {
  loadNotes();
  return notes.find((note) => note.id === id);
}

export function createNote(title, content) {
  loadNotes();
  const note = {
    id: generateId(),
    title: title || "Untitled Note",
    content: content || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.push(note);
  saveNotes();
  return note;
}

export function updateNote(id, title, content) {
  loadNotes();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return null;

  notes[index] = {
    ...notes[index],
    title: title !== undefined ? title : notes[index].title,
    content: content !== undefined ? content : notes[index].content,
    updatedAt: new Date().toISOString(),
  };
  saveNotes();
  return notes[index];
}

export function deleteNote(id) {
  loadNotes();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return false;

  notes.splice(index, 1);
  saveNotes();
  return true;
}
