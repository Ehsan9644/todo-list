
const todoInput = document.getElementById("todoInput");
const listContainer = document.getElementById("list-container");
const userId = localStorage.getItem("userId");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {

fetch("https://dummyjson.com/todos/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    todo: todoInput.value,
    completed: false,
    userId: userId,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to add todo.");
    }
    return response;
  })
  .then((data) => {
    console.log(data);
    const status = data.status;
    console.log("Status:" + status);

    if (status == 200) {
      const todoText = todoInput.value.trim();
      if (todoText === "") {
        alert("You must write something");
        return;
      }
      const todo = {
        todo: todoText,
        completed: false,
        userId: userId,
      };
      todos.unshift(todo);

      saveData();

      renderTodo(todo);

      todoInput.value = "";
      alert("Your TODO Added succesfully");
    } 
    else {
       alert("Bad Request");
    }
    function saveData() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
 function renderTodo(todo) {
   let li = document.createElement("li");
   li.textContent = todo.todo;
   listContainer.prepend(li); // Add the new todo to the beginning of the list
 }
  })
  
  .catch((error) => {
    console.error("Error:", error);
   
  });
}

