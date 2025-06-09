import React from 'react';
function NotesList({notes,onEdit,onDelete}){
  return(
    <div>
      {notes.map(note=>(
        <div key={note.id} style={noteCard}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={()=>onEdit(note)}style={editBtn}>Edit</button>
          <button onClick={()=>onDelete(note.id)}style={deleteBtn}>Delete</button>
        </div>
      ))}
    </div>
  );
}
const noteCard={
  background:'#f9fafb',
  padding:'1rem',
  borderRadius:'12px',
  marginBottom:'1rem',
  boxShadow:'0 2px 6px rgba(0,0,0,0.04)',
};
const editBtn={
  padding:'0.4rem 0.8rem',
  background:'#10b981',
  color:'white',
  border:'none',
  borderRadius:'6px',
  cursor:'pointer',
  marginRight:'0.5rem',
};
const deleteBtn={
  padding:'0.4rem 0.8rem',
  background:'#ef4444',
  color:'white',
  border:'none',
  borderRadius:'6px',
  cursor:'pointer',
};
export default NotesList;
