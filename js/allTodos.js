fetch("https://dummyjson.com/todos")
  .then((response) => response.json())
  .then((data) => {
    const todosData = data.todos;
    const todoContainer = document.getElementById("todo-container");

    const todoItems = todosData.map((todo) => {
      const todoItemDiv = document.createElement("div");
      todoItemDiv.classList.add("todo-item");

      const todoTextBox = document.createElement("input");
      todoTextBox.type = "text";
      todoTextBox.value = todo.todo;
      todoTextBox.readOnly = true;

      todoItemDiv.appendChild(todoTextBox);
      return todoItemDiv;
    });

    todoItems.forEach((todoItem) => {
      todoContainer.appendChild(todoItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching todos:", error);
  });

/////////
////////filter
///////
fetch("https://dummyjson.com/users")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch users.");
    }
  })
  .then((data) => {
    const userSelect = document.getElementById("userSelect");

    const options = data.users.map((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.firstName + " " + user.lastName;
      return option;
    });

    options.forEach((option) => {
      userSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    alert("Failed to fetch users.");
  });

document
  .getElementById("loadTodosButton")
  .addEventListener("click", function () {
    const userId = document.getElementById("userSelect").value;

    if (!userId) {
      alert("Please select a user.");
      return;
    }

    fetch(`https://dummyjson.com/users/${userId}/todos`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch todos.");
        }
      })
      .then((data) => {
        displayTodos(data.todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        alert("Failed to fetch todos. Please try again.");
      });
  });

function displayTodos(todos) {
  const todoContainer = document.getElementById("todo-container");
  todoContainer.innerHTML = "";
  const todoElements = todos.map((todo) => {
    const todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item");

    const todoTextBox = document.createElement("input");
    todoTextBox.type = "text";
    todoTextBox.value = todo.todo;
    todoTextBox.readOnly = true;

    todoItemDiv.appendChild(todoTextBox);

    return todoItemDiv;
  });
  todoElements.forEach((todoElement) => {
    todoContainer.appendChild(todoElement);
  });
}
