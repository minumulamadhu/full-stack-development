import React,{useState,useEffect} from'react';
import {addTask,updateTask} from'../api';
const TaskForm=({setTasks,editingTask,setEditingTask})=>{
  const [formData,setFormData]=useState({
    title:'',
    description:'',
    priority:'Medium',
    deadline:''
  });
  useEffect(()=>{
    if(editingTask){
      setFormData({
        title:editingTask.title||'',
        description:editingTask.description||'',
        priority:editingTask.priority||'Medium',
        deadline:editingTask.deadline||''
      });
    }else{
      setFormData({
        title:'',
        description:'',
        priority:'Medium',
        deadline:''
      });
    }
  },[editingTask]);
  const handleChange=e=>{
    const{name,value}=e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));
  };
  const handleSubmit=async e=>{
    e.preventDefault();
    try{
      if(editingTask){
        const updatedTask=await updateTask(editingTask.id,formData);
        setTasks(prev=>prev.map(task=>
          task.id===editingTask.id?updatedTask:task
        ));
        setEditingTask(null);
      }else{
        const newTask=await addTask(formData);
        setTasks(prev=>[...prev,newTask]);
      }
      setFormData({
        title:'',
        description:'',
        priority:'Medium',
        deadline:''
      });
    }catch(error){
      console.error('Error submitting task:',error);
      alert('Failed to save task. Please try again.');
    }
  };
  const cancelEdit=()=>{
    setEditingTask(null);
    setFormData({
      title:'',
      description:'',
      priority:'Medium',
      deadline:''
    });
  };
  return(
    <div className="task-form-container">
      <h2>{editingTask?'Edit Task':'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter task description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline (optional)</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask?'Update Task':'Add Task'}
          </button>
          {editingTask&&(
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default TaskForm;