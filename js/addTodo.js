




const todoInput = document.getElementById("todoInput");
const listContainer = document.getElementById("list-container");
const userId = localStorage.getItem("userId");

// Load todos from local storage or initialize an empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    alert("You must write something");
    return;
  }

  // Create a todo object
  const todo = {
    todo: todoText,
    completed: false,
    userId: userId,
  };

  // Add todo to the array
  todos.push(todo);

  saveData();

  todoInput.value = "";
}

function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Show todos on the webpage
function showTasks() {
  listContainer.innerHTML = ""; // Clear the list before rendering
  todos.forEach((todo) => {
    renderTodo(todo);
  });
}

showTasks();
