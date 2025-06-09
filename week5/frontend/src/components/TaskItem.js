import React from'react';
import {deleteTask,updateTask} from'../api';
const TaskItem=({task,setTasks,setEditingTask})=>{
  const{id,title,description,completed,priority,deadline}=task;
  const formattedDeadline=deadline
    ?new Date(deadline).toLocaleDateString('en-US',{
      year:'numeric',
      month:'short',
      day:'numeric'
    })
    :'No deadline';
  const handleToggleComplete=async()=>{
    try{
      const updatedTask=await updateTask(id,{
        ...task,
        completed:!completed
      });
      setTasks(prev=>prev.map(t=>
        t.id===id?updatedTask:t
      ));
    }catch(error){
      console.error('Error updating task completion:',error);
      alert('Failed to update task. Please try again.');
    }
  };
  const handleEdit=()=>{
    setEditingTask(task);
    window.scrollTo({top:0,behavior:'smooth'});
  };
  const handleDelete=async()=>{
    if(window.confirm('Are you sure you want to delete this task?')){
      try{
        await deleteTask(id);
        setTasks(prev=>prev.filter(t=>t.id!==id));
      }catch(error){
        console.error('Error deleting task:',error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };
  const priorityClass=`priority-${priority.toLowerCase()}`;
  return(
    <div className={`task-item ${completed?'completed':''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3>
            <span
              className="checkbox"
              onClick={handleToggleComplete}
            >
              {completed?'✓':'○'}
            </span>
            {title}
          </h3>
          <span className={`priority-badge ${priorityClass}`}>
            {priority}
          </span>
        </div>
        {description&&(
          <p className="task-description">{description}</p>
        )}
        <div className="task-footer">
          <span className="deadline">
            <i className="deadline-icon">📅</i> {formattedDeadline}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={handleEdit}
          aria-label="Edit task"
        >
          ✏️
        </button>
        <button
          className="delete-btn"
          onClick={handleDelete}
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
export default TaskItem;
