const userId = localStorage.getItem("userId");
const listContainer = document.getElementById("list-container");

// Load todos from local storage or initialize an empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Show todos on the webpage
function showTasks() {
  listContainer.innerHTML = ""; 
  todos.forEach((todo) => {
    renderTodo(todo);
  });
}

// Render a todo item on the webpage
  function renderTodo(todo) {
  let li = document.createElement("li");
  li.textContent = todo.todo;

  // Add a class if todo is completed
  if (todo.completed) {
    li.classList.add("checked");
  }

  // Add event listener to toggle completion status
  li.addEventListener("click", function () {
    todo.completed = !todo.completed;
    li.classList.toggle("checked");
    saveData();
  });

  // Create delete button
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";

  // Add event listener to delete todo
  span.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent the li's click event from firing
    const index = todos.indexOf(todo);
    if (index > -1) {
      todos.splice(index, 1);
      li.remove();
      saveData();
    }
  });

  li.appendChild(span);
  listContainer.appendChild(li);
}

// Save todos to local storage
function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Fetch todos from the API if user ID is available
if (userId) {
  console.log("User ID:", userId);

  const url = `https://dummyjson.com/todos/user/${userId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const todosDataFromAPI = data.todos;

      // Filter out todos from the API that are already present in local storage
      const filteredTodos = todosDataFromAPI.filter((todoFromAPI) => {
        return !todos.find((todo) => todo.todo === todoFromAPI.todo);
      });

      // Merge filtered todos from the API with existing todos
      todos = todos.concat(filteredTodos);

      // Save the merged todos array to local storage
      saveData();

      // Show todos on the webpage
      showTasks();
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
} else {
  console.log("User ID not found in localStorage");
}

