const express=require('express');
const cors=require('cors');
const app=express();
const PORT=5000;
app.use(cors());
app.use(express.json());
let notes=[];
let id=1;
app.get('/',(req,res)=>{
  res.send('Notes API is running on /notes');
});
app.get('/notes',(req,res)=>{
  res.json(notes);
});
app.post('/notes',(req,res)=>{
  const {title,content}=req.body;
  const newNote={id:id++,title,content};
  notes.push(newNote);
  res.status(201).json(newNote);
});
app.put('/notes/:id',(req, res)=>{
  const noteId=parseInt(req.params.id);
  const {title,content}=req.body;
  const note=notes.find(n =>n.id===noteId);
  if (note){
    note.title=title;
    note.content=content;
    res.json(note);
  }else{
    res.status(404).json({message:'Note not found'});
  }
});
app.delete('/notes/:id',(req,res)=>{
  const noteId=parseInt(req.params.id);
  const index=notes.findIndex(n=>n.id===noteId);
  if (index!==-1){
    notes.splice(index,1);
    res.status(204).end();
  }else{
    res.status(404).json({message:'Note not found'});
  }
});
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});
