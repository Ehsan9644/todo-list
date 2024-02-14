//edit API
// fetch("https://dummyjson.com/todos/1", {
//   method: "PUT" /* or PATCH */,
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     completed: false,
//   }),
// })
//   .then((response) => {
//      return response
//     })
//   .then((data) => {
//     // Log the data received from the server
//     console.log(data);
//     // Access the status of the response
//     const status = data.status;
//     console.log("Status:" + status);
//   });
  

// //delete Api
// fetch("https://dummyjson.com/todos/8", {
//   method: "DELETE",
// })
//  .then((response) => {
//      return response
//     })
//   .then((data) => {
//     // Log the data received from the server
//     console.log(data);
//     // Access the status of the response
//     const status = data.status;
//     console.log(" delete API Status:" + status);
//   });








const userId = localStorage.getItem("userId");
const listContainer = document.getElementById("list-container");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function showTasks() {
  listContainer.innerHTML = "";
  todos.forEach((todo) => {
    renderTodo(todo);
  });
}

function renderTodo(todo) {
  let li = document.createElement("li");
  li.textContent = todo.todo;

  if (todo.completed) {
    li.classList.add("checked");
  }

  li.addEventListener("click", function () {
    //edit API
    fetch("https://dummyjson.com/todos/1", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: false,
      }),
    })
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log(data);
        const status = data.status;
        console.log("Update API Status:" + status);
        if (status == 200) {
          todo.completed = !todo.completed;
          li.classList.toggle("checked");
          saveData();
        } else {
          alert("Bad Request");
        }
      });
      
  });

  //  delete button
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";

  //event listener to delete todo
  span.addEventListener("click", function (e) {
    //delete api
    fetch("https://dummyjson.com/todos/8", {
      method: "DELETE",
    })
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log(data);
        const status = data.status;
        console.log(" delete API Status:" + status);
        if (status == 200) {
          e.stopPropagation(); 
          const index = todos.indexOf(todo);
          if (index > -1) {
            todos.splice(index, 1);
            li.remove();
            //status of the 
            saveData();
          } 
        }
      });
  });
  li.appendChild(span);
  listContainer.appendChild(li);
}

function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

if (userId) {
  console.log("User ID:", userId);

  const url = `https://dummyjson.com/todos/user/${userId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const todosDataFromAPI = data.todos;
      console.log(todosDataFromAPI);
      // Filter out todos from the API that are already present in local storage
      const filteredTodos = todosDataFromAPI.filter((todoFromAPI) => {
        return !todos.find((todo) => todo.todo === todoFromAPI.todo);
      });

      todos = todos.concat(filteredTodos);
      saveData();

      showTasks();
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
} else {
  console.log("User ID not found in localStorage");
}
