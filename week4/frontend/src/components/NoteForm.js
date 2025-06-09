import React,{useState,useEffect} from 'react';
function NoteForm({onAdd,onUpdate,editingNote,cancelEdit}){
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  useEffect(()=>{
    if(editingNote){
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }else{
      setTitle('');
      setContent('');
    }
  },[editingNote]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(editingNote){
      onUpdate(editingNote.id,{title,content });
    }else{
      onAdd({title,content});
    }
    setTitle('');
    setContent('');
  };
  return(
    <form onSubmit={handleSubmit} style={{marginBottom:'2rem'}}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        required
        style={inputStyle}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        required
        style={{...inputStyle,height:'100px',resize:'vertical'}}
      />
      <div>
        <button type="submit" style={buttonPrimary}>
          {editingNote?'Update':'Add'} Note
        </button>
        {editingNote&&(
          <button type="button" onClick={cancelEdit} style={buttonSecondary}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
const inputStyle={
  width:'100%',
  padding:'0.75rem',
  marginBottom:'0.5rem',
  borderRadius:'8px',
  border:'1px solid #d1d5db',
  fontSize:'1rem',
};
const buttonPrimary={
  padding:'0.6rem 1.2rem',
  background:'#3b82f6',
  color:'#fff',
  border:'none',
  borderRadius:'6px',
  cursor:'pointer',
  marginRight:'0.5rem',
};
const buttonSecondary={
  padding:'0.6rem 1.2rem',
  background:'#e5e7eb',
  color:'#111827',
  border:'none',
  borderRadius:'6px',
  cursor:'pointer',
};
export default NoteForm;
