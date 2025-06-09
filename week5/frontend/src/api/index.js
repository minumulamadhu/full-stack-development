import axios from'axios';
const API_URL=process.env.REACT_APP_API_URL||'http://localhost:5000';
const api=axios.create({
  baseURL:`${API_URL}/tasks`,
  headers:{
    'Content-Type':'application/json'
  }
});
export const fetchTasks=async()=>{
  try{
    const response=await api.get('/');
    return response.data;
  }catch(error){
    console.error('Error fetching tasks:',error);
    throw error;
  }
};
export const addTask=async(task)=>{
  try{
    const response=await api.post('/',task);
    return response.data;
  }catch(error){
    console.error('Error adding task:',error);
    throw error;
  }
};
export const updateTask=async(id,task)=>{
  try{
    const response=await api.put(`/${id}`,task);
    return response.data;
  }catch(error){
    console.error(`Error updating task ${id}:`,error);
    throw error;
  }
};
export const deleteTask=async(id)=>{
  try{
    const response=await api.delete(`/${id}`);
    return response.data;
  }catch(error){
    console.error(`Error deleting task ${id}:`,error);
    throw error;
  }
};
