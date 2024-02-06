const todoInput=document.getElementById("todoInput");
const listContainer=document.getElementById("list-container");

function addtodo(){
    if(todoInput.value === ''){
    alert("You must write something");
}
else{
let li =document.createElement("li");
li.innerHTML = todoInput.value;
listContainer.appendChild(li);
}
todoInput.value = "";
}
