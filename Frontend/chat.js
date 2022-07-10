var chatLog=[];
// var selfChat=[];
var groups=[];
var groupSelected=0;
window.addEventListener('DOMContentLoaded',async ()=>{
    // if(localStorage.getItem('chats')) chatLog=JSON.parse(localStorage.getItem('chats'));
    // else localStorage.setItem('chats',JSON.stringify(chatLog));

    if(localStorage.getItem('groupSelected')) groupSelected=parseInt(localStorage.getItem('groupSelected')) ;
    else localStorage.setItem('groupSelected',groupSelected);

    if(localStorage.getItem('groups')) groups=JSON.parse(localStorage.getItem('groups'));
    else localStorage.setItem('groups',JSON.stringify(groups));

    // await getChat();
    // // console.log(4)
    document.getElementById('send-msg').addEventListener("click",async(event)=>{
        await axios.post('http://localhost:3000/chat',{
            groupId:groupSelected,
            msg:document.getElementById('msg-input').value
        },
        {
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }}
        );
        // chatLog.push(chat.data.chat);
        document.getElementById('msg-input').value='';
        // addChat(chat.data.chat);
    });
    await updateGroups();
    await showGroups();

    document.getElementById('group-container').addEventListener("click",async(event)=>{
        event.preventDefault();
        console.log(event.target.id);
        const id=event.target.id;
        if(id=='info'){
            const t=event.target.parentNode.firstChild.id;
            console.log(t,event.target.parentNode);
            localStorage.setItem('groupSelected',t);
            location.href='./groupinfo.html'
            return
        }
        getChat(id)
    });
    if(groupSelected!==0) getChat(groupSelected);
    // getChat();
    // setInterval(()=>getChat(),1000);
})
async function getChat(id){
    const chats=await axios.get(`http://localhost:3000/chat/${id}?id=0`,
        {
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }}
        );
    groupSelected=id;
    localStorage.setItem('groupSelected',groupSelected);
    chatLog=chats.data;
    showChats();
}

async function showChats(){
    const chatBox=document.getElementById('chat-container');
    chatBox.innerHTML='';
    for(x of chatLog){
        // if(selfChat.some(e=>e.id===x.id)) x.name="YOU"
        // console.log(selfChat.some(e=>e.id===parseInt(x.id)))
        const tr=document.createElement('tr');
        tr.innerHTML=`<td>${x.name} : ${x.msg}</td>`;
        chatBox.appendChild(tr);
        // console.log(tr);
    }
}
// function addChat(x){
//     const chatBox=document.getElementById('chat-container');
//     const tr=document.createElement('tr');
//     tr.innerHTML=`<td>${x.name} : ${x.msg}</td>`;
//     chatBox.appendChild(tr);
//     console.log(tr);
// }
async function updateGroups(){
    const groupres= await axios.get(`http://localhost:3000/mygroups`,{
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }}
    );
    groups=groupres.data;
    localStorage.setItem('groups',JSON.stringify(groups));
}

function showGroups(){
    const table=document.getElementById('group-container');
    if(groups.length>0) table.innerHTML='';
    for(x of groups){
        const tr=document.createElement('tr');
        tr.innerHTML=`<td id='${x.id}'>${x.name}</td><button id="info">i</button>`;
        table.appendChild(tr);
    }
}