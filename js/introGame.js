window.addEventListener("load",function(){
    //selectors
    let goObject =document.querySelector("input[type=submit]");
    let nameObject=document.querySelector("input[type=text]");
    //do
    goObject.onclick = function(){
                localStorage.setItem("name", nameObject.value)
                location.href = "http://127.0.0.1:5501/game.html?"
    }
})
