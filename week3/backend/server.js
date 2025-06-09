const express=require('express');
const cors=require('cors');
const app=express();
const PORT=3000;
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Server is running. You should test the form from the front-end.');
});
const submissions=[];
app.post('/submit-form',(req,res)=>{
  const{name,email,message}=req.body;
  if(!name||!email||!message){
    return res.status(400).json({
      success:false,
      message:'All fields (name, email, message) are required.'
    });
  }
  submissions.push({name,email,message});
  console.log('Form submitted:',{name,email,message});
  res.json({
    success:true,
    message:'Thank you for your message!'
  });
});
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});
