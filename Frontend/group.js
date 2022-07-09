window.addEventListener('DOMContentLoaded',async ()=>{
   document.getElementById('create-btn').addEventListener('click',async(event)=>{
    try {
        event.preventDefault();
    const name=document.getElementById('group-name').value;
    // console.log(name)
    document.getElementById('group-name').value='';
    const group=await axios.post('http://localhost:3000/creategroup',{
        name
    },
    {
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }}
    );
    location.href='./chat.html';
    } catch (err) {
        console.log(err);
    }  
   })
})