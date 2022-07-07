var chatLog=[]
window.addEventListener('DOMContentLoaded',async ()=>{
    getChat();
    showChats();
})
async function getChat(){
    const chats=await axios.get('http://localhost:3000/chat',{
        headers:{
            "Authorisation":`Bearer ${localStorage.getItem('token')}`
        }
    });
    console.log(chats);
    chatLog=chats;
    return chats
}

async function showChats(){
    const chatBox=document.getElementById('chat-container');
    for(x of chatLog){
        const tr=document.createElement('tr');
        tr.innerHTML=`<td>${x.name} : ${x.msg}</td>`;
        chatBox.appendChild(tr);
    }
}