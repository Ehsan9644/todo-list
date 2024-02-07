fetch("https://dummyjson.com/todos")
  .then((response) => response.json())
  .then((data) => {
    // Extract the array of todos from the response data
    const todosData = data.todos;

    // Find the container element where you want to display the todo list
    const todoContainer = document.getElementById("todo-container");

    // Loop through the todosData array and create HTML elements for each todo item
    todosData.forEach((todo) => {
      // Create a div element for the todo item
      const todoItemDiv = document.createElement("div");
      todoItemDiv.classList.add("todo-item");

      // Create a text box for the todo
      const todoTextBox = document.createElement("input");
      todoTextBox.type = "text";
      todoTextBox.value = todo.todo;
      todoTextBox.readOnly = true; // Make it read-only

      // Create a button to edit the todo
      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.addEventListener("click", function () {
        // Enable editing of the text box
        todoTextBox.readOnly = false;
      });

      // Create a button to delete the todo
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteButton.addEventListener("click", function () {
        // Remove the todo item
        todoItemDiv.remove();
      });

      // Append the text box and buttons to the todo item div
      todoItemDiv.appendChild(todoTextBox);
      todoItemDiv.appendChild(editButton);
      todoItemDiv.appendChild(deleteButton);

      // Append the todo item div to the container
      todoContainer.appendChild(todoItemDiv);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error("Error fetching todos:", error);
  });
