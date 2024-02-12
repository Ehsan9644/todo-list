fetch("https://dummyjson.com/todos")
  .then((response) => response.json())
  .then((data) => {
    // Extract the array of todos from the response data
    const todosData = data.todos;

    // Find the container element where you want to display the todo list
    const todoContainer = document.getElementById("todo-container");

    // Create HTML elements for each todo item using map
    const todoItems = todosData.map((todo) => {
      // Create a div element for the todo item
      const todoItemDiv = document.createElement("div");
      todoItemDiv.classList.add("todo-item");

      // Create a text box for the todo
      const todoTextBox = document.createElement("input");
      todoTextBox.type = "text";
      todoTextBox.value = todo.todo;
      todoTextBox.readOnly = true; // Make it read-only

      // // Create a button to edit the todo
      // const editButton = document.createElement("button");
      // editButton.innerHTML = '<i class="fas fa-edit"></i>';
      // editButton.addEventListener("click", function () {
      //   // Enable editing of the text box
      //   todoTextBox.readOnly = false;
      // });

      // // Create a button to delete the todo
      // const deleteButton = document.createElement("button");
      // deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      // deleteButton.addEventListener("click", function () {
      //   // Remove the todo item
      //   todoItemDiv.remove();
      // });

      // Append the text box and buttons to the todo item div
      todoItemDiv.appendChild(todoTextBox);
      // todoItemDiv.appendChild(editButton);
      // todoItemDiv.appendChild(deleteButton);

      // Return the todo item div
      return todoItemDiv;
    });

    // Append all todo item divs to the container
    todoItems.forEach((todoItem) => {
      todoContainer.appendChild(todoItem);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error("Error fetching todos:", error);
  });

/////////
////////filter

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

    // Populate the dropdown menu with users' names using map
    const options = data.users.map((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.firstName + " " + user.lastName;
      return option;
    });

    // Append all options to the dropdown menu
    options.forEach((option) => {
      userSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    alert("Failed to fetch users. Please try again.");
  });

// Event listener for the "Load Todos" button
document
  .getElementById("loadTodosButton")
  .addEventListener("click", function () {
    const userId = document.getElementById("userSelect").value;

    // Validate user selection
    if (!userId) {
      alert("Please select a user.");
      return;
    }

    // Fetch todos of the selected user
    fetch(`https://dummyjson.com/users/${userId}/todos`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch todos.");
        }
      })
      .then((data) => {
        // Display the todos of the selected user
        displayTodos(data.todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        alert("Failed to fetch todos. Please try again.");
      });
  });

function displayTodos(todos) {
  const todoContainer = document.getElementById("todo-container");

  // Clear previous todos
  todoContainer.innerHTML = "";

  // Loop through todos and display them
  // Map todos to array of HTML elements and append them to the container
  const todoElements = todos.map((todo) => {
    // Create a div element for the todo item
    const todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item");

    // Create a text box for the todo
    const todoTextBox = document.createElement("input");
    todoTextBox.type = "text";
    todoTextBox.value = todo.todo;
    todoTextBox.readOnly = true; // Make it read-only

    // Append the text box to the todo item div
    todoItemDiv.appendChild(todoTextBox);

    return todoItemDiv; // Return the todo item div
  });

  // Append all todo item divs to the container
  todoElements.forEach((todoElement) => {
    todoContainer.appendChild(todoElement);
  });
}
