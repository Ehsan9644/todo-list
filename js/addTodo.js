const todoInput = document.getElementById("todoInput");
const listContainer = document.getElementById("list-container");

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
  };

  // Add todo to the array
  todos.push(todo);

  // Render the todo on the UI
  renderTodo(todo);

  // Save the updated todos array to local storage
  saveData();

  todoInput.value = "";
}

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

// Call showTasks initially to load todos from local storage
showTasks();

// const todoInput = document.getElementById("todoInput");
// const listContainer = document.getElementById("list-container");
// const userId = localStorage.getItem("userId");
// // Load todo items from local storage or initialize an empty array
// let todos = JSON.parse(localStorage.getItem("todos")) || [];

// function addTodo() {
//   if (todoInput.value === "") {
//     alert("You must write something");
//   } else {
//     // Create a todo object
//     const todo = {
//       todo: todoInput.value,
//       completed: false,
//       userId: userId, // You can set this dynamically if needed
//     };

//     // Add todo to the array
//     todos.push(todo);

//     // Render the todo on the UI
//     renderTodo(todo);

//     // Save the updated todos array to local storage
//     saveData();
//   }
//   todoInput.value = "";
// }

// function renderTodo(todo) {
//   let li = document.createElement("li");
//   li.textContent = todo.todo;

//   // Add a class if todo is completed
//   if (todo.completed) {
//     li.classList.add("checked");
//   }

//   // Add event listener to toggle completion status
//   li.addEventListener("click", function () {
//     todo.completed = !todo.completed;
//     li.classList.toggle("checked");
//     saveData();
//   });

//   // Create delete button
//   let span = document.createElement("span");
//   span.innerHTML = "\u00d7";

//   // Add event listener to delete todo
//   span.addEventListener("click", function (e) {
//     e.stopPropagation(); // Prevent the li's click event from firing
//     const index = todos.indexOf(todo);
//     if (index > -1) {
//       todos.splice(index, 1);
//       li.remove();
//       saveData();
//     }
//   });

//   li.appendChild(span);
//   listContainer.appendChild(li);
// }

// function saveData() {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// function showTasks() {
//   listContainer.innerHTML = ""; // Clear the list before rendering
//   todos.forEach((todo) => {
//     renderTodo(todo);
//   });
// }

// // Call showTasks initially to load todos from local storage
// showTasks();

// // const todoInput = document.getElementById("todoInput");
// // const listContainer = document.getElementById("list-container");

// // function addTodo() {
// //   if (todoInput.value === "") {
// //     alert("You must write something");
// //   } else {
// //     let li = document.createElement("li");
// //     li.innerHTML = todoInput.value;
// //     listContainer.appendChild(li);

// //     let span = document.createElement("span");
// //     span.innerHTML = "\u00d7";
// //     li.appendChild(span);
// //   }
// //   todoInput.value = "";
// //   saveData();
// // }

// // listContainer.addEventListener(
// //   "click",
// //   function (e) {
// //     if (e.target.tagName === "LI") {
// //       e.target.classList.toggle("checked");
// //       saveData();
// //     } else if (e.target.tagName === "SPAN") {
// //       e.target.parentElement.remove();
// //       saveData();
// //     }
// //   },
// //   false
// // );

// // function saveData() {
// //   localStorage.setItem("data", listContainer.innerHTML);
// // }
// // function showTask() {
// //   listContainer.innerHTML = localStorage.getItem("data");
// // }
// // showTask();
// // const data = localStorage.getItem("data");
// // console.log(data);

// // // const userId = localStorage.getItem("userId");

// // // fetch("https://dummyjson.com/todos/add", {
// // //   method: "POST",
// // //   headers: { "Content-Type": "application/json" },
// // //   body: JSON.stringify({
// // //     todo: "To complete ADD todo functionality",
// // //     completed: false,
// // //     userId: userId,
// // //   }),
// // // })
// // //   .then((res) => res.json())
// // //   .then(console.log);
// // // Function to fetch and display todos
// // // Function to fetch and display todos

// // // Function to add a new todo item
// // // function addTodo(todoText, completedStatus, userId) {

// // //   fetch("https://dummyjson.com/todos/add", {
// // //     method: "POST",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify({
// // //       todo: todoText,
// // //       completed: completedStatus,
// // //       userId: userId,
// // //     }),
// // //   })
// // //     .then((response) => {
// // //       if (!response.ok) {
// // //         throw new Error("Failed to add todo.");
// // //       }
// // //       return response.json();
// // //     })
// // //     .then((data) => {
// // //       console.log("Todo added successfully:", data);

// // //     })
// // //     .catch((error) => {
// // //       console.error("Error adding todo:", error);
// // //     });
// // // }
// // // function handleFormSubmit(event) {
// // //   event.preventDefault();
// // //   const todoText = document.getElementById("todo-text").value;
// // //   const userId = localStorage.getItem("userId");
// // //   addTodo(todoText, false, userId);
// // //   document.getElementById("add-todo-form").reset();
// // // }
// // // document.getElementById("add-todo-form").addEventListener("submit", handleFormSubmit);
// // // const userId = localStorage.getItem("userId");
