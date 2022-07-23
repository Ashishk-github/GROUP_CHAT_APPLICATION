window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('signup-form').addEventListener("submit",async(event)=>{
        try {
            event.preventDefault();
        const resp=await fetch(event.target.action,{
            method:"POST",
            body:new URLSearchParams(new FormData(event.target))
        });
        const body=await resp.json();
        // console.log(body)
        if(body.status===200) {
            alert('Successfully registered,Please Login');
            location.href='https://my-conversation.herokuapp.com/login.html';
        }
        else if(body.status===403) errmsg('User already exists');
        else if(body.status===500) errmsg('Please try again later');
        } catch (err) {
            console.log(err);
        }
    })
})

function errmsg(msg){
    const err=document.getElementById('error');
    err.innerText='*'+msg;
}