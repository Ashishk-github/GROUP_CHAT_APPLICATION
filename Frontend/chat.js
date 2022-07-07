var chatLog=[];
window.addEventListener('DOMContentLoaded',async ()=>{
    await getChat();
    console.log(4)
    showChats();
    document.getElementById('send-msg').addEventListener("click",async(event)=>{
        const chat=await axios.post('http://localhost:3000/chat',{
            msg:document.getElementById('msg-input').value
        },
        {
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }}
        );
        chatLog.push(chat.data.chat);
        document.getElementById('msg-input').value='';
        addChat(chat.data.chat);
    });
})
async function getChat(){
    const chats=await axios.get('http://localhost:3000/chat',{
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }}
    );
    console.log(chats);
    chatLog=chats.data.chat;
}

async function showChats(){
    const chatBox=document.getElementById('chat-container');
    chatBox.innerHTML='';
    for(x of chatLog){
        const tr=document.createElement('tr');
        tr.innerHTML=`<td>${x.name} : ${x.msg}</td>`;
        chatBox.appendChild(tr);
        // console.log(tr);
    }
}
function addChat(x){
    const chatBox=document.getElementById('chat-container');
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${x.name} : ${x.msg}</td>`;
    chatBox.appendChild(tr);
    console.log(tr);
}