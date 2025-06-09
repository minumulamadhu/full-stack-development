import React,{useState} from'react';
import TaskItem from'./TaskItem';
const TaskList=({tasks,setTasks,setEditingTask})=>{
  const[sortBy,setSortBy]=useState('default');
  const[filterPriority,setFilterPriority]=useState('all');
  const filteredTasks=tasks.filter(task=>{
    if(filterPriority==='all')return true;
    return task.priority===filterPriority;
  });
  const sortedTasks=[...filteredTasks].sort((a,b)=>{
    switch(sortBy){
      case'priority-high':
        const priorityOrder={'High':1,'Medium':2,'Low':3};
        return priorityOrder[a.priority]-priorityOrder[b.priority];
      case'priority-low':
        const priorityOrderReverse={'High':3,'Medium':2,'Low':1};
        return priorityOrderReverse[a.priority]-priorityOrderReverse[b.priority];
      case'deadline':
        if(!a.deadline)return 1;
        if(!b.deadline)return -1;
        return new Date(a.deadline)-new Date(b.deadline);
      default:
        return a.id-b.id;
    }
  });
  const handleSortChange=e=>{
    setSortBy(e.target.value);
  };
  const handleFilterChange=e=>{
    setFilterPriority(e.target.value);
  };
  return(
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks ({sortedTasks.length})</h2>
        <div className="task-filters">
          <div className="filter-group">
            <label htmlFor="priority-filter">Filter by:</label>
            <select
              id="priority-filter"
              value={filterPriority}
              onChange={handleFilterChange}
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="default">Default</option>
              <option value="priority-high">Priority (High to Low)</option>
              <option value="priority-low">Priority (Low to High)</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>
      </div>
      {sortedTasks.length===0?(
        <p className="no-tasks-message">
          {tasks.length===0
            ?'No tasks yet. Add a task to get started!'
            :'No tasks match your current filters.'}
        </p>
      ):(
        <div className="tasks-grid">
          {sortedTasks.map(task=>(
            <TaskItem
              key={task.id}
              task={task}
              setTasks={setTasks}
              setEditingTask={setEditingTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default TaskList;
