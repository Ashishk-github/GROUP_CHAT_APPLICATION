window.addEventListener('DOMContentLoaded',()=>{
    document.forms['login-form'].addEventListener("submit",async(event)=>{
        event.preventDefault();
        const resp=await fetch(event.target.action,{
            method:"POST",
            body:new URLSearchParams(new FormData(event.target))
        });
        const body=await resp.json();
        localStorage.setItem('token',body);
    })
})