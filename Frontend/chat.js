var chatLog=[];
window.addEventListener('DOMContentLoaded',async ()=>{
    if(localStorage.getItem('chats')) chatLog=JSON.parse(localStorage.getItem('chats'));
    else JSON.stringify(localStorage.setItem('chats',chatLog));

    // await getChat();
    // // console.log(4)
    // document.getElementById('send-msg').addEventListener("click",async(event)=>{
    //     const chat=await axios.post('http://localhost:3000/chat',{
    //         msg:document.getElementById('msg-input').value
    //     },
    //     {
    //         headers: {
    //                   'Authorization': `Bearer ${localStorage.getItem('token')}` 
    //                 }}
    //     );
    //     // chatLog.push(chat.data.chat);
    //     // document.getElementById('msg-input').value='';
    //     // addChat(chat.data.chat);
    // });
    // getChat();
    setInterval(()=>getChat(),1000);
})
async function getChat(){
    const chat_id=(chatLog.length>0)?(chatLog[chatLog.length-1].id):0
    const chats=await axios.get(`http://localhost:3000/chat?id=${chat_id}`,{
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }}
    );
    console.log(chats);
    chatLog=chatLog.concat(chats.data.chat);
    const chatLS=JSON.stringify(chatLog)
    localStorage.setItem('chats',chatLS)
    showChats();
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
// function addChat(x){
//     const chatBox=document.getElementById('chat-container');
//     const tr=document.createElement('tr');
//     tr.innerHTML=`<td>${x.name} : ${x.msg}</td>`;
//     chatBox.appendChild(tr);
//     console.log(tr);
// }