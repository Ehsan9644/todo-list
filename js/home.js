// Retrieve the user ID from localStorage

fetch("https://dummyjson.com/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "rshawe2",
    password: "OWsTbMUgFc",
    // expiresInMins: 60, // optional
  }),
})
  .then((res) => res.json())
  .then(console.log);

const userId = localStorage.getItem("userId");

// Check if the user ID exists
if (userId) {
  // Use the user ID as needed
  console.log("User ID:", userId);

  // Construct the URL with the user ID
  const url = `https://dummyjson.com/todos/user/${userId}`;

  // Fetch todos for the specific user
  fetch(url)
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

        // Create a button to update the todo status
        const updateButton = document.createElement("button");
        updateButton.innerHTML = '<i class="fas fa-check"></i>';
        updateButton.addEventListener("click", function () {
          // Get the todo ID associated with the todo item
          const todoId = todo.id; // Assuming todo object has an 'id' property
          console.log("todoid" , todoId);
          // Determine the updated status (toggle between completed and not completed)
          const updatedStatus = !todo.completed;

          // Send a PUT request to the API endpoint to update the todo status
          fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: updatedStatus }),
          })
            .then((response) => {
              if (response.ok) {
                
                // If the update is successful, toggle the completed status of the todo
                todo.completed = updatedStatus;

                // Update the UI to reflect the new status (e.g., change color or styling)
                if (updatedStatus) {
                  todoItemDiv.classList.add("completed");
                } else {
                  todoItemDiv.classList.remove("completed");
                }
              } else {
                // Handle errors if update fails
                console.error(
                  "Failed to update todo status:",
                  response.statusText
                );
              }
            })
            .catch((error) => {
              // Handle any network or fetch-related errors
              console.error("Error updating todo status:", error);
            });
        });

        // Create a button to delete the todo
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener("click", function () {
          // Get the todo ID associated with the todo item
          const todoId = todos.id; // Assuming todo object has an 'id' property

          // Send a DELETE request to the API endpoint to delete the todo
          fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                // If the deletion is successful, remove the todo item from the UI
                todoItemDiv.remove();
              } else {
                // Handle errors if deletion fails
                console.error("Failed to delete todo:", response.statusText);
              }
            })
            .catch((error) => {
              // Handle any network or fetch-related errors
              console.error("Error deleting todo:", error);
            });
        });

        // Append the text box and buttons to the todo item div
        todoItemDiv.appendChild(todoTextBox);
        todoItemDiv.appendChild(updateButton);
        todoItemDiv.appendChild(deleteButton);

        // Append the todo item div to the container
        todoContainer.appendChild(todoItemDiv);
      });
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error fetching todos:", error);
    });
} else {
  console.log("User ID not found in localStorage");
}

//logout function
document.getElementById("logout").addEventListener("click", function () {
  // Clear any authentication tokens or session data
  // For example, if using localStorage for storing tokens:
  localStorage.removeItem("token");

  // Redirect the user to the login page
  window.location.href = "../components/sign-in.html";
});
