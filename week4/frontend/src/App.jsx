import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";
function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/notes");
    setNotes(res.data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  const addNote = async (note) => {
    await axios.post("http://localhost:5000/notes", note);
    fetchNotes();
  };
  const updateNote = async (id, updatedNote) => {
    await axios.put(`http://localhost:5000/notes/${id}`, updatedNote);
    setEditingNote(null);
    fetchNotes();
  };
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
  };
  return (
    <div className="container">
      <h1> Notes App</h1>
      <NoteForm
        onAdd={addNote}
        onUpdate={updateNote}
        editingNote={editingNote}
        cancelEdit={() => setEditingNote(null)}
      />
      <NotesList notes={notes} onEdit={setEditingNote} onDelete={deleteNote} />
    </div>
  );
}
export default App;
