const userId = localStorage.getItem("userId");
const listContainer = document.getElementById("list-container");

// Load todos from local storage or initialize an empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Show todos on the webpage
function showTasks() {
  listContainer.innerHTML = ""; // Clear the list before rendering
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

// Fetch todos from the API
if (userId) {
  console.log("User ID:", userId);

  const url = `https://dummyjson.com/todos/user/${userId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const todosDataFromAPI = data.todos;

      // Merge todos from the API with existing todos
      todos = todos.concat(todosDataFromAPI);

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

// const userId = localStorage.getItem("userId");
// if (userId) {
//   console.log("User ID:", userId);

//   const url = `https://dummyjson.com/todos/user/${userId}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const todosData = data.todos;
//       const todoContainer = document.getElementById("todo-container");
//       const todoItems = todosData.map((todo) => {
//         const todoItemDiv = document.createElement("div");
//         todoItemDiv.classList.add("todo-item");

//         const todoTextBox = document.createElement("input");
//         todoTextBox.type = "text";
//         todoTextBox.value = todo.todo;
//         todoTextBox.readOnly = true; // Make it read-only

//         // // Create a button to update the todo status
//         // const updateButton = document.createElement("button");
//         // updateButton.innerHTML = '<i class="fas fa-check"></i>';
//         // updateButton.addEventListener("click", function () {
//         //   // Get the todo ID associated with the todo item
//         //   const todoId = todo.id; // Assuming todo object has an 'id' property

//         //   // Determine the updated status (toggle between completed and not completed)
//         //   const updatedStatus = !todo.completed;

//         //   // Send a PUT request to the API endpoint to update the todo status
//         //   fetch(`https://dummyjson.com/todos/${todoId}`, {
//         //     method: "PUT",
//         //     headers: {
//         //       "Content-Type": "application/json",
//         //     },
//         //     body: JSON.stringify({ completed: updatedStatus }),
//         //   })
//         //     .then((response) => {
//         //       if (response.ok) {
//         //         // If the update is successful, toggle the completed status of the todo
//         //         todo.completed = updatedStatus;

//         //         // Update the UI to reflect the new status (e.g., change color or styling)
//         //         if (updatedStatus) {
//         //           todoItemDiv.classList.add("completed");
//         //         } else {
//         //           todoItemDiv.classList.remove("completed");
//         //         }
//         //       } else {
//         //         // Handle errors if update fails
//         //         console.error(
//         //           "Failed to update todo status:",
//         //           response.statusText
//         //         );
//         //       }
//         //     })
//         //     .catch((error) => {
//         //       // Handle any network or fetch-related errors
//         //       console.error("Error updating todo status:", error);
//         //     });
//         // });

//         // // Create a button to delete the todo
//         // const deleteButton = document.createElement("button");
//         // deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
//         // deleteButton.addEventListener("click", function () {
//         //   // Get the todo ID associated with the todo item
//         //   const todoId = todo.id; // Assuming todo object has an 'id' property

//         //   // Send a DELETE request to the API endpoint to delete the todo
//         //   fetch(`https://dummyjson.com/todos/${todoId}`, {
//         //     method: "DELETE",
//         //     headers: {
//         //       "Content-Type": "application/json",
//         //     },
//         //   })
//         //     .then((response) => {
//         //       if (response.ok) {
//         //
//         //         todoItemDiv.remove();
//         //       } else {
//         //
//         //         console.error("Failed to delete todo:", response.statusText);
//         //       }
//         //     })
//         //     .catch((error) => {
//         //
//         //       console.error("Error deleting todo:", error);
//         //     });
//         // });

//         // Append the text box and buttons to the todo item div
//         todoItemDiv.appendChild(todoTextBox);
//         // todoItemDiv.appendChild(updateButton);
//         // todoItemDiv.appendChild(deleteButton);

//         return todoItemDiv;
//       });
//       todoItems.forEach((todoItem) => {
//         todoContainer.appendChild(todoItem);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching todos:", error);
//     });
// } else {
//   console.log("User ID not found in localStorage");
// }

// // const userId = localStorage.getItem("userId");

// // const url = `https://dummyjson.com/todos/user/${userId}`;

// // fetch(url)
// //   .then((response) => response.json())
// //   .then((data) => {
// //     console.log(data);
// //     const todosDataFromAPI = data.todos;
// //     console.log("Todos Data from API:", todosDataFromAPI);

// //     // Retrieve existing todos array from local storage or initialize as an empty array if it doesn't exist
// //     let todos = JSON.parse(localStorage.getItem("todos")) || [];

// //     // Merge existing todos with new todos from API
// //     todos = todos.concat(todosDataFromAPI);

// //     // Store the merged todos array back to local storage
// //     localStorage.setItem("todos", JSON.stringify(todos));

// //     // Show todos on the webpage
// //     const todoContainer = document.getElementById("todo-container");
// //     todoContainer.innerHTML = ""; // Clear existing content

// //     todos.forEach((todo) => {
// //       const todoItemDiv = document.createElement("div");
// //       todoItemDiv.classList.add("todo-item");

// //       const todoTextBox = document.createElement("input");
// //       todoTextBox.type = "text";
// //       todoTextBox.value = todo.todo;
// //       todoTextBox.readOnly = true; // Make it read-only
// //       todoItemDiv.appendChild(todoTextBox);

// //       // Add a button for toggling completion status
// //       const toggleButton = document.createElement("button");
// //       toggleButton.textContent = todo.completed
// //         ? "Mark Incomplete"
// //         : "Mark Complete";
// //       toggleButton.addEventListener("click", function () {
// //         todo.completed = !todo.completed;
// //         toggleButton.textContent = todo.completed
// //           ? "Mark Incomplete"
// //           : "Mark Complete";
// //         saveData();
// //       });
// //       todoItemDiv.appendChild(toggleButton);

// //       // Add a button for deleting todo
// //       const deleteButton = document.createElement("button");
// //       deleteButton.textContent = "Delete";
// //       deleteButton.addEventListener("click", function () {
// //         todos = todos.filter((t) => t !== todo); // Remove the todo from the array
// //         todoItemDiv.remove(); // Remove the todo item from the UI
// //         saveData();
// //       });
// //       todoItemDiv.appendChild(deleteButton);

// //       todoContainer.appendChild(todoItemDiv);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error("Error fetching todos:", error);
// //   });

// // function saveData() {
// //   localStorage.setItem("todos", JSON.stringify(todos));
// // }

// // // const userId = localStorage.getItem("userId");
// // // console.log( userId);

// // // const url = `https://dummyjson.com/todos/user/${userId}`;

// // // fetch(url)
// // //   .then((response) => response.json())
// // //   .then((data) => {
// // //     console.log(data)
// // //     const todosDataFromAPI = data.todos;
// // //     console.log("Todos Data from API:", todosDataFromAPI);

// // //     // Retrieve existing todos array from local storage or initialize as an empty array if it doesn't exist
// // //     let todos = JSON.parse(localStorage.getItem("todos")) || [];

// // //     // Merge existing todos with new todos from API
// // //     todos = todos.concat(todosDataFromAPI);

// // //     // Store the merged todos array back to local storage
// // //     localStorage.setItem("todos", JSON.stringify(todos));

// // //     // Show todos on the webpage
// // //           const todosData = data.todos;

// // //     const todoContainer = document.getElementById("todo-container");

// // //    const todoItemDiv= todosData.map((todo) => {
// // //       const todoItemDiv = document.createElement("div");
// // //       todoItemDiv.classList.add("todo-item");

// // //       const todoTextBox = document.createElement("input");
// // //       todoTextBox.type = "text";
// // //       todoTextBox.value = todo.todo;
// // //       todoTextBox.readOnly = true; // Make it read-only
// // //       todoItemDiv.appendChild(todoTextBox);
// // //       todoContainer.appendChild(todoItemDiv);
// // //     });
// // //   })
// // //   .catch((error) => {
// // //     console.error("Error fetching todos:", error);
// // //   });

// // // fetch("https://dummyjson.com/auth/login", {
// // //   method: "POST",
// // //   headers: { "Content-Type": "application/json" },
// // //   body: JSON.stringify({
// // //     username: "rshawe2",
// // //     password: "OWsTbMUgFc",
// // //   }),
// // // })
// // //   .then((res) => res.json())
// // //   .then((loginData) => {
// // //     const userId = loginData.userId;
// // //     console.log("User ID:", userId);
// // //     localStorage.setItem("userId", userId);

// // //     const url = `https://dummyjson.com/todos/user/${userId}`;

// // //     fetch(url)
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         const todosDataFromAPI = data.todos;
// // //         console.log("Todos Data from API:", todosDataFromAPI);

// // //         // Retrieve existing todos array from local storage or initialize as an empty array if it doesn't exist
// // //         let todos = JSON.parse(localStorage.getItem("todos")) || [];

// // //         // Merge existing todos with new todos from API
// // //         todos = todos.concat(todosDataFromAPI);

// // //         // Store the merged todos array back to local storage
// // //         localStorage.setItem("todos", JSON.stringify(todos));

// // //         // Show todos on the webpage
// // //         const todoContainer = document.getElementById("todo-container");
// // //         todoContainer.innerHTML = ""; // Clear existing content
// // //         todos.forEach((todo) => {
// // //           const todoItemDiv = document.createElement("div");
// // //           todoItemDiv.classList.add("todo-item");
// // //           const todoTextBox = document.createElement("input");
// // //           todoTextBox.type = "text";
// // //           todoTextBox.value = todo.todo;
// // //           todoTextBox.readOnly = true; // Make it read-only
// // //           todoItemDiv.appendChild(todoTextBox);
// // //           todoContainer.appendChild(todoItemDiv);
// // //         });
// // //       })
// // //       .catch((error) => {
// // //         console.error("Error fetching todos:", error);
// // //       });
// // //   })
// // //   .catch((error) => {
// // //     console.error("Error logging in:", error);
// // //   });

// // // // fetch("https://dummyjson.com/auth/login", {
// // // //   method: "POST",
// // // //   headers: { "Content-Type": "application/json" },
// // // //   body: JSON.stringify({
// // // //     username: "rshawe2",
// // // //     password: "OWsTbMUgFc",
// // // //   }),
// // // // })
// // // //   .then((res) => res.json())
// // // //   .then(console.log);

// // // // const userId = localStorage.getItem("userId");
// // // // if (userId) {
// // // //   console.log("User ID:", userId);
// // // // const userId = localStorage.getItem("userId");
// // // // if (userId) {
// // // //   console.log("User ID:", userId);

// // // //   const url = `https://dummyjson.com/todos/user/${userId}`;

// // // //   fetch(url)
// // // //     .then((response) => response.json())
// // // //     .then((data) => {
// // // //       const todosData = data.todos;
// // // //       console.log(todosData);

// // // //       const todosDataJSON = JSON.stringify(todosData);

// // // //       // Store the JSON string in the local storage under the key "todos"
// // // //       localStorage.setItem("todos", todosDataJSON);
// // // //       const todoContainer = document.getElementById("todo-container");
// // // //       const todoItems = todosData.map((todo) => {
// // // //         const todoItemDiv = document.createElement("div");
// // // //         todoItemDiv.classList.add("todo-item");

// // // //         const todoTextBox = document.createElement("input");
// // // //         todoTextBox.type = "text";
// // // //         todoTextBox.value = todo.todo;
// // // //         todoTextBox.readOnly = true; // Make it read-only

// // // //         // // Create a button to update the todo status
// // // //         // const updateButton = document.createElement("button");
// // // //         // updateButton.innerHTML = '<i class="fas fa-check"></i>';
// // // //         // updateButton.addEventListener("click", function () {
// // // //         //   // Get the todo ID associated with the todo item
// // // //         //   const todoId = todo.id; // Assuming todo object has an 'id' property

// // // //         //   // Determine the updated status (toggle between completed and not completed)
// // // //         //   const updatedStatus = !todo.completed;

// // // //         //   // Send a PUT request to the API endpoint to update the todo status
// // // //         //   fetch(`https://dummyjson.com/todos/${todoId}`, {
// // // //         //     method: "PUT",
// // // //         //     headers: {
// // // //         //       "Content-Type": "application/json",
// // // //         //     },
// // // //         //     body: JSON.stringify({ completed: updatedStatus }),
// // // //         //   })
// // // //         //     .then((response) => {
// // // //         //       if (response.ok) {
// // // //         //         // If the update is successful, toggle the completed status of the todo
// // // //         //         todo.completed = updatedStatus;

// // // //         //         // Update the UI to reflect the new status (e.g., change color or styling)
// // // //         //         if (updatedStatus) {
// // // //         //           todoItemDiv.classList.add("completed");
// // // //         //         } else {
// // // //         //           todoItemDiv.classList.remove("completed");
// // // //         //         }
// // // //         //       } else {
// // // //         //         // Handle errors if update fails
// // // //         //         console.error(
// // // //         //           "Failed to update todo status:",
// // // //         //           response.statusText
// // // //         //         );
// // // //         //       }
// // // //         //     })
// // // //         //     .catch((error) => {
// // // //         //       // Handle any network or fetch-related errors
// // // //         //       console.error("Error updating todo status:", error);
// // // //         //     });
// // // //         // });

// // // //         // // Create a button to delete the todo
// // // //         // const deleteButton = document.createElement("button");
// // // //         // deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
// // // //         // deleteButton.addEventListener("click", function () {
// // // //         //   // Get the todo ID associated with the todo item
// // // //         //   const todoId = todo.id; // Assuming todo object has an 'id' property

// // // //         //   // Send a DELETE request to the API endpoint to delete the todo
// // // //         //   fetch(`https://dummyjson.com/todos/${todoId}`, {
// // // //         //     method: "DELETE",
// // // //         //     headers: {
// // // //         //       "Content-Type": "application/json",
// // // //         //     },
// // // //         //   })
// // // //         //     .then((response) => {
// // // //         //       if (response.ok) {
// // // //         //
// // // //         //         todoItemDiv.remove();
// // // //         //       } else {
// // // //         //
// // // //         //         console.error("Failed to delete todo:", response.statusText);
// // // //         //       }
// // // //         //     })
// // // //         //     .catch((error) => {
// // // //         //
// // // //         //       console.error("Error deleting todo:", error);
// // // //         //     });
// // // //         // });

// // // //         // Append the text box and buttons to the todo item div
// // // //         todoItemDiv.appendChild(todoTextBox);
// // // //         // todoItemDiv.appendChild(updateButton);
// // // //         // todoItemDiv.appendChild(deleteButton);

// // // //         return todoItemDiv;
// // // //       });
// // // //       todoItems.forEach((todoItem) => {
// // // //         todoContainer.appendChild(todoItem);
// // // //       });
// // // //     })
// // // //     .catch((error) => {
// // // //       console.error("Error fetching todos:", error);
// // // //     });
// // // // } else {
// // // //   console.log("User ID not found in localStorage");
// // // // }
// // // // // const todos = localStorage.setItem("todos");
// // // // // todos.push(todosData);

// // // // //  const todosDataJSON = JSON.stringify(todosData);

// // // // //  // Store the JSON string in the local storage under the key "todos"
// // // // //  localStorage.setItem("todos", todosDataJSON);

// // // // // let todos = JSON.parse(localStorage.getItem("todos")) || [];

// // // // // // Push new data from the API into the todos array
// // // // // todos.push(...todosData);

// // // // // // Convert todos array to a JSON string
// // // // // const todosJSON = JSON.stringify(todos);

// // // // // // Store the JSON string in the local storage under the key "todos"
// // // // // localStorage.setItem("todos", todosJSON);
