import Note from "../models/note.js";

export async function getAllNotes(req, res) {

  try{
    const notes = await Note.find();
    res.status(200).json(notes);

  }catch(error){
      console.error("Error in get all notes",error);
      res.status(500).json({message: "Internal server error"})
  }
}; 

export async function createNotes(req, res) {
  
  try{
    const{ title , content} = res.body;
    const newNote = new Note({ title , content})

    await newNote.save();
    res.status(201).json({message: "Note created sussecfully"})
  }catch(error){
    console.error("Error in create note",error)
    res.status(500).json({message:"Ayyayyoo"})
  }
}; 

export async function updateNotes (req, res) {
  res.status(200).json({message: "Note updated successfully !!"});
}; 

export async function deleteNotes (req, res)  {
  res.status(200).json({message: "Note deleted successfully !!"});
}; 