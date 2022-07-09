window.addEventListener('DOMContentLoaded',async ()=>{
    groupSelected=localStorage.getItem('groupSelected')
    document.getElementById('addmember').addEventListener("click",async(event)=>{
        await axios.post('http://localhost:3000/addmember',{
            gid:parseInt(localStorage.getItem('groupSelected')),
            phno:document.getElementById('phno-add').value
        },
        {
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }}
        );
        document.getElementById('phno-add').value='';
    });
    // document.getElementById('members').addEventListener("click",async(event)=>{
        
    //     await axios.post('http://localhost:3000/removemember',{
    //         gid:parseInt(localStorage.getItem('groupSelected')),
    //         phno:document.getElementById('phno-add').value
    //     },
    //     {
    //         headers: {
    //                   'Authorization': `Bearer ${localStorage.getItem('token')}` 
    //                 }}
    //     );
    // });
    
})