var chatLog=[];
// var selfChat=[];
var groups=[];
var groupSelected;
window.addEventListener('DOMContentLoaded',async ()=>{
    // if(localStorage.getItem('chats')) chatLog=JSON.parse(localStorage.getItem('chats'));
    // else localStorage.setItem('chats',JSON.stringify(chatLog));

    // if(localStorage.getItem('selfChat')) selfChat=JSON.parse(localStorage.getItem('selfChat'));
    // else localStorage.setItem('selfChat',JSON.stringify(selfChat));

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
    showGroups();

    document.getElementById('group-container').addEventListener("click",async(event)=>{
        event.preventDefault();
        console.log(event.target.id);
        const id=event.target.id;
        const chats=await axios.get(`http://localhost:3000/chat/${id}?id=0`,
        {
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }}
        );
        groupSelected=id;
        chatLog=chats.data;
        showChats();
        // chatLog.push(chat.data.chat);
        // document.getElementById('msg-input').value='';
        // addChat(chat.data.chat);
    });
    // showChats();
    // getChat();
    // setInterval(()=>getChat(),1000);
})
// async function getChat(){
//     const chat_id=(chatLog.length>0)?(chatLog[chatLog.length-1].id):0
//     const self_chat=(selfChat.length>0)?(selfChat[selfChat.length-1].id):0
//     const chats=await axios.get(`http://localhost:3000/chat?id=${chat_id}&user=${self_chat}`,{
//         headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('token')}` 
//                 }}
//     );
//     // console.log(chats);
//     if(!chats.data.chat) return;
//     chatLog=chatLog.concat(chats.data.chat);
//     selfChat=selfChat.concat(chats.data.self);
//     if(chatLog.length>1000){
//         const length=chatLog.length-1000;
//         chatLog.splice(0,length);
//     }
//     const chatLS=JSON.stringify(chatLog)
//     localStorage.setItem('chats',chatLS)
//     localStorage.setItem('selfChat',JSON.stringify(selfChat));
//     showChats();
// }

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
        tr.innerHTML=`<td id='${x.id}'>${x.name}</td>`;
        table.appendChild(tr);
    }
}