const todoInput = document.getElementById("todoInput");
const listContainer = document.getElementById("list-container");

function addtodo() {
  if (todoInput.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = todoInput.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  todoInput.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
const data = localStorage.getItem("data");
console.log(data)

// const userId = localStorage.getItem("userId");

// fetch("https://dummyjson.com/todos/add", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     todo: "To complete ADD todo functionality",
//     completed: false,
//     userId: userId,
//   }),
// })
//   .then((res) => res.json())
//   .then(console.log);
// Function to fetch and display todos
// Function to fetch and display todos

// Function to add a new todo item
// function addTodo(todoText, completedStatus, userId) {
 
//   fetch("https://dummyjson.com/todos/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       todo: todoText,
//       completed: completedStatus,
//       userId: userId,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to add todo.");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Todo added successfully:", data);
    
//     })
//     .catch((error) => {
//       console.error("Error adding todo:", error);
//     });
// }
// function handleFormSubmit(event) {
//   event.preventDefault(); 
//   const todoText = document.getElementById("todo-text").value;
//   const userId = localStorage.getItem("userId");
//   addTodo(todoText, false, userId);
//   document.getElementById("add-todo-form").reset();
// }
// document.getElementById("add-todo-form").addEventListener("submit", handleFormSubmit);
// const userId = localStorage.getItem("userId");
