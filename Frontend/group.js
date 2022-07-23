window.addEventListener('DOMContentLoaded',async ()=>{
   document.getElementById('create-btn').addEventListener('click',async(event)=>{
    try {
        event.preventDefault();
    const name=document.getElementById('group-name').value;
    // console.log(name)
    document.getElementById('group-name').value='';
    const group=await axios.post('https://my-conversation.herokuapp.com/creategroup',{
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