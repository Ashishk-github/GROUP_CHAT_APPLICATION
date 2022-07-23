// var chatLog={};
// var selfChat=[];
var groups=[];
var groupSelected=0;
var selectedGroup={};
window.addEventListener('DOMContentLoaded',async ()=>{
    if(localStorage.getItem('groupSelected')) groupSelected=localStorage.getItem('groupSelected');
    else localStorage.setItem('groupSelected',groupSelected);

    if(localStorage.getItem('groups')) groups=JSON.parse(localStorage.getItem('groups'));
    else localStorage.setItem('groups',JSON.stringify(groups));

    if(localStorage.getItem('selectedGroup')) selectedGroup=JSON.parse(localStorage.getItem('selectedGroup'));
    else localStorage.setItem('selectedGroup',JSON.stringify(selectedGroup));

    if(groupSelected!==0) document.getElementById('msg-div').style.display='block';

    document.getElementById('send-msg').addEventListener("click",async(event)=>{
        await axios.post('https://my-conversation.herokuapp.com/chat',{
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
    const file=document.getElementById('file-upload')
    file.addEventListener('change',async()=>{
        try {
            if(!confirm(`are you sure want to upload ${file.files[0].name}`)) return;
        const url=await axios.get('https://my-conversation.herokuapp.com/media',{
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` ,
                    }});
        console.log(url);
        
        await fetch(url.data.url, {
            method:"PUT",
            headers: {
              "Content-Type": `${file.files[0].type}`
            },
            body: file.files[0]
          })
        const imageUrl = url.data.url.split('?')[0]
        await axios.post('https://my-conversation.herokuapp.com/chat',{
            groupId:groupSelected,
            msg:imageUrl,
            image:true
        },{
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` ,
                    }});
        } catch (error) {
            console.log(error)
        }
    });
    // await showGroups();
    await updateGroups();
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
        groupSelected=id;
        localStorage.setItem('groupSelected',id)
        showChats();
    });
    setInterval(()=>{
        // if(groupSelected!==0) getChat(groupSelected);
        updateGroups();
    },1000);
    if(groupSelected!=0){
        selectedGroup=groups.find(a=>a._id==groupSelected)
        localStorage.setItem('selectedGroup',JSON.stringify(selectedGroup));
        // getChat(groupSelected);
        showChats();
    }
    
})
// async function getChat(id){
//     if(!chatLog[id]) {
//         chatLog[id]=[];
//     }
//     const chat=chatLog[id];
//     const chatId=(chat.length>0)?chat[chat.length-1].id:0;
//     const chats=await axios.get(`https://my-conversation.herokuapp.com/chat/${id}?id=${chatId}`,
//         {
//             headers: {
//                       'Authorization': `Bearer ${localStorage.getItem('token')}` 
//                     }}
//         );
//     groupSelected=id;
//     localStorage.setItem('groupSelected',groupSelected);
//     if(chats.data.length<1) return;
//     chatLog[id]=chat.concat(chats.data);
//     localStorage.setItem('chatLog',JSON.stringify(chatLog));
//     showChats();
// }

async function showChats(){
    if(groupSelected!==0) document.getElementById('msg-div').style.display='block';
    const chatBox=document.getElementById('chat-container');
    chatBox.innerHTML='';
    for(x of selectedGroup.chats){
        // if(x.image){
        //     const tr=document.createElement('tr');
        // tr.innerHTML=`<td>${x.name} : <embed src="${x.msg}" style="width:180px;heigth:180px;border-radius:10%"></td>`;
        // tr.className='.tr-embed';
        // chatBox.appendChild(tr);
        // continue;
        // }
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
    const lastGroup=(groups.length>0)?groups[groups.length-1].id:0
    const groupres= await axios.get(`https://my-conversation.herokuapp.com/mygroups?id=${lastGroup}`,{
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }}
    );
    if(groupres.data.length===0) return;
    
    groups=(groupres.data);
    // console.log(groupres);
    localStorage.setItem('groups',JSON.stringify(groups));
    if(groupSelected!=0)selectedGroup=groups.find(a=>a._id==groupSelected)
    showGroups();
}

function showGroups(){
    const table=document.getElementById('group-container');
    if(groups.length>0) table.innerHTML='';
    for(x of groups){
        const tr=document.createElement('tr');
        tr.innerHTML=`<td id='${x._id.toString()}'>${x.name}</td><td><button id="info">i</button></td>`;
        table.appendChild(tr);
    }
    showChats();
}
