const form=document.getElementById('contactForm');
const responseMessage=document.getElementById('responseMessage');
form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const name=document.getElementById('name').value.trim();
  const email=document.getElementById('email').value.trim();
  const message=document.getElementById('message').value.trim();
  if(!name||!email||!message){
    responseMessage.textContent='Please fill in all fields.';
    responseMessage.className='message error';
    return;
  }
  try{
    const res=await fetch('http://localhost:3000/submit-form',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name,email,message})
    });
    const data=await res.json();
    if(data.success){
      responseMessage.textContent=data.message;
      responseMessage.className='message success';
      form.reset();
    }else{
      responseMessage.textContent=data.message||'Something went wrong.';
      responseMessage.className='message error';
    }
  }catch(error){
    responseMessage.textContent='Server error. Please try again later.';
    responseMessage.className='message error';
  }
});
