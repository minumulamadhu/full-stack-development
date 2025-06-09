const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const taskRoutes=require('./routes/tasks');
dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());
app.use('/tasks',taskRoutes);
app.get('/',(req,res)=>{
  res.send('Task Manager API is running');
});
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});