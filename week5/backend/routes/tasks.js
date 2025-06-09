const express=require('express');
const router=express.Router();
let tasks=[
  {
    id:1,
    title:'Learn Node.js',
    description:'Study Express framework',
    completed:false,
    priority:'High',
    deadline:'2025-04-30'
  },
  {
    id:2,
    title:'Build React frontend',
    description:'Create components and connect to API',
    completed:false,
    priority:'Medium',
    deadline:'2025-05-05'
  }
];
router.get('/',(req,res)=>{
  res.json(tasks);
});
router.get('/:id',(req,res)=>{
  const task=tasks.find(task=>task.id===parseInt(req.params.id));
  if (!task) return res.status(404).json({message:'Task not found' });
  res.json(task);
});
router.post('/',(req,res)=>{
  const newTask={
    id:tasks.length>0?Math.max(...tasks.map(task=>task.id))+1:1,
    title:req.body.title,
    description:req.body.description||'',
    completed:req.body.completed||false,
    priority:req.body.priority||'Medium',
    deadline:req.body.deadline||null
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
router.put('/:id',(req, res)=>{
  const taskIndex=tasks.findIndex(task=>task.id===parseInt(req.params.id));
  if (taskIndex===-1) return res.status(404).json({message:'Task not found'});
  const updatedTask={
    id:parseInt(req.params.id),
    title:req.body.title||tasks[taskIndex].title,
    description:req.body.description!==undefined?req.body.description:tasks[taskIndex].description,
    completed:req.body.completed!== undefined?req.body.completed:tasks[taskIndex].completed,
    priority:req.body.priority||tasks[taskIndex].priority,
    deadline:req.body.deadline!==undefined?req.body.deadline:tasks[taskIndex].deadline
  };
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});
router.delete('/:id',(req,res)=>{
  const taskIndex=tasks.findIndex(task=>task.id===parseInt(req.params.id));
  if(taskIndex===-1) return res.status(404).json({message:'Task not found' });
  const deletedTask=tasks[taskIndex];
  tasks=tasks.filter(task=>task.id!==parseInt(req.params.id));
  res.json(deletedTask);
});
module.exports = router;