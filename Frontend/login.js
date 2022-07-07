window.addEventListener('DOMContentLoaded',()=>{
    document.forms['login-form'].addEventListener("submit",async(event)=>{
        try {
            event.preventDefault();
        const resp=await fetch(event.target.action,{
            method:"POST",
            body:new URLSearchParams(new FormData(event.target))
        });
        const body=await resp.json();
        console.log(body)
        if(body.status===200) {
            localStorage.setItem('token',body.token);
            location.href='http://localhost:3000/chat.html';
        }
        else if(body.status===403) errmsg('Please enter correct password');
        else if(body.status===404) errmsg('User doesnot exist');
        else if(body.status===500) errmsg('Please try again later');
        } catch (err) {
            console.log(err);
            if(err.response.status===403) errmsg('Please enter correct password');
            else if(err.response.status===500) errmsg('Please try again later');
            else if(err.response.status===404) errmsg('User doesnot exist');
        }
    })
})

function errmsg(msg){
    const err=document.getElementById('error');
    err.innerText='*'+msg;
}