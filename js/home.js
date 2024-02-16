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
    //edit todo status API
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

  //delete todo function
  span.addEventListener("click", function (e) {
    //delete api
    //if the status is 200 then the code of delete function will work
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
  editPopup.style.display = "block";
  document.getElementById("saveBtn").addEventListener("click", function handleSave() {
    const editedTodo = editedTodoInput.value;
    todo.todo = editedTodo;
    saveData();
    li.querySelector(".todo-text").textContent = editedTodo;
    editPopup.style.display = "none";
    document.getElementById("saveBtn").removeEventListener("click", handleSave);
  });
  document.getElementById("cancelBtn").addEventListener("click", function handleCancel () {
    editPopup.style.display = "none";
        document.getElementById("cancelBtn").removeEventListener("click", handleCancel);
  });
}


