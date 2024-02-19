const userId = localStorage.getItem("userId");
const listContainer = document.getElementById("list-container");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(localStorage.userImage);
function showTasks() {
  listContainer.innerHTML = "";
  todos.forEach((todo) => {
    renderTodo(todo);
  });
}

function renderTodo(todo) {
  let li = document.createElement("li");
  // li.textContent = todo.todo;
  let todoText = document.createElement("div");
  todoText.textContent = todo.todo;
  todoText.classList.add("todo-text");
  li.appendChild(todoText);

  //edit button
  let editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.classList.add("edit-btn");

  editBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    handleEdit(todo, li);
  });

  if (todo.completed) {
    li.classList.add("checked");
  }
  // todo status changing function
  li.addEventListener("click", function () {
    const todoid=todo.id;
   
    //edit todo status API
    fetch(`https://dummyjson.com/todos/${todoid}`, {
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
  const span = document.createElement("span");
  span.innerHTML = "\u00d7";
  span.classList.add("close");
  li.appendChild(span);

  span.addEventListener("click", function (e) {
    e.stopPropagation();
    handleDelete(todo, li);
  });

  li.appendChild(editBtn);
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
      // Filter funtion that filter out todos from the API that are already present in local storage to prevent make copies of todo
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

function handleEdit(todo, li) {
  const editPopup = document.getElementById("editPopup");
  const editedTodoInput = document.getElementById("editedTodo");
  editedTodoInput.value = todo.todo;
  const todoId = todo.id;
  editPopup.style.display = "block";
  document
    .getElementById("saveBtn")
    .addEventListener("click", function handleSave() {

fetch(`https://dummyjson.com/todos/${todoId}`, {
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
      const editedTodo = editedTodoInput.value;
      todo.todo = editedTodo;
      saveData();
      li.querySelector(".todo-text").textContent = editedTodo;
      editPopup.style.display = "none";
      document
        .getElementById("saveBtn")
        .removeEventListener("click", handleSave);
    } else {
      alert("Bad Request");
    }
  });
    });
  document
    .getElementById("cancelBtn")
    .addEventListener("click", function handleCancel() {
      editPopup.style.display = "none";
      document
        .getElementById("cancelBtn")
        .removeEventListener("click", handleCancel);
    });
}

function handleDelete(todo, li) {
  const deletePopup = document.getElementById("deletePopup");
  deletePopup.style.display = "block";
  const todoId=todo.id;
console.log("id "+todoId);
console.log(todo);
  const confirmBtn = document.getElementById("confirmDeleteBtn");
  const cancelBtn = document.getElementById("cancelDeleteBtn");

  confirmBtn.addEventListener("click", function handleConfirm() {
    fetch(`https://dummyjson.com/todos/${todoId}`, {
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
          const index = todos.indexOf(todo);
          if (index > -1) {
            todos.splice(index, 1);
            li.remove();
            saveData();
          }
        }
      })
      
        deletePopup.style.display = "none";
        confirmBtn.removeEventListener("click", handleConfirm);
      
  });

  cancelBtn.addEventListener("click", function handleCancel() {
    deletePopup.style.display = "none";
    cancelBtn.removeEventListener("click", handleCancel);
  });
}