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

export async function getNoteById(req, res) {
  try{
    const oneNote = await Note.findById(req.params.id)

    if(!oneNote){
      return res.status(404).json({message: " Note not found"})
    }
    res.status(201).json(oneNote)
    
  }catch(error){

  }
  
}

export async function createNotes(req, res) {
  
  try{
    const{ title , content} = req.body;
    const newNote = new Note({ title , content})

    const savedNote = await newNote.save();
    res.status(201).json({message: "Note created sussecfully"})
  }catch(error){
    console.error("Error in create note",error)
    res.status(500).json({message:"Internal server error"})
  }
}; 

export async function updateNotes (req, res) {
  try{
    const{ title , content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content})

    if(!updatedNote){
      return res.status(404).json({message : "Note not found"})
    }
    res.status(201).json({message:"Note updated succesfully"})
  }catch(error){
     console.error("Error in update note",error)
    res.status(500).json({message:"Internal server error"})
  }
}; 

export async function deleteNotes (req, res)  {
  try{
   
    const deletedNote = await Note.findByIdAndDelete(req.params.id)

    if(!deletedNote){
      return res.status(404).json({message:"Note not found"})
    }
    res.status(201).json({message:"Note deleted successfully"})
  }catch(error){
    console.error("Error in delete note",error)
    res.status(500).json({message:"Internal server error"})
  }
}; 