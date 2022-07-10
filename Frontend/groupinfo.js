var groupMembers=[];
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
    await getMembers();
    await showMembers();

    document.getElementById('members').addEventListener("click",async(event)=>{
        event.preventDefault();
        const target=event.target;
        if(target.id!=='remove') return
        console.log(target.parentNode.firstChild.id);
        id=target.parentNode.firstChild.id;
        await axios.post('http://localhost:3000/removemember',{
            gid:parseInt(localStorage.getItem('groupSelected')),
            id:id
        },
        {
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }}
        );
        await getMembers();
        await showMembers();
    });
    
})

async function getMembers(){
    const users=await axios.post('http://localhost:3000/getmember',{
            gid:parseInt(localStorage.getItem('groupSelected')),
        },
        {
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }}
        );
        console.log(users);
        groupMembers=users.data;
        localStorage.setItem('Members',JSON.stringify(groupMembers));
}

function showMembers(){
    const table=document.getElementById('members');
    table.innerHTML='';
    for(x of groupMembers){
        const tr=document.createElement('tr');
        tr.innerHTML=`<td id='${x.id}'>${x.name}</td><button class="remove-btn" id="remove">X</button>`;
        table.appendChild(tr);
    }
}