

fetch("https://dummyjson.com/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "rshawe2",
    password: "OWsTbMUgFc",
 
  }),
})
  .then((res) => res.json())
  .then(console.log);


const userId = localStorage.getItem("userId");
if (userId) {
  console.log("User ID:", userId);

  const url = `https://dummyjson.com/todos/user/${userId}`;

  fetch(url)
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
        todoTextBox.readOnly = true; // Make it read-only

        // // Create a button to update the todo status
        // const updateButton = document.createElement("button");
        // updateButton.innerHTML = '<i class="fas fa-check"></i>';
        // updateButton.addEventListener("click", function () {
        //   // Get the todo ID associated with the todo item
        //   const todoId = todo.id; // Assuming todo object has an 'id' property

        //   // Determine the updated status (toggle between completed and not completed)
        //   const updatedStatus = !todo.completed;

        //   // Send a PUT request to the API endpoint to update the todo status
        //   fetch(`https://dummyjson.com/todos/${todoId}`, {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ completed: updatedStatus }),
        //   })
        //     .then((response) => {
        //       if (response.ok) {
        //         // If the update is successful, toggle the completed status of the todo
        //         todo.completed = updatedStatus;

        //         // Update the UI to reflect the new status (e.g., change color or styling)
        //         if (updatedStatus) {
        //           todoItemDiv.classList.add("completed");
        //         } else {
        //           todoItemDiv.classList.remove("completed");
        //         }
        //       } else {
        //         // Handle errors if update fails
        //         console.error(
        //           "Failed to update todo status:",
        //           response.statusText
        //         );
        //       }
        //     })
        //     .catch((error) => {
        //       // Handle any network or fetch-related errors
        //       console.error("Error updating todo status:", error);
        //     });
        // });

        // // Create a button to delete the todo
        // const deleteButton = document.createElement("button");
        // deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        // deleteButton.addEventListener("click", function () {
        //   // Get the todo ID associated with the todo item
        //   const todoId = todo.id; // Assuming todo object has an 'id' property

        //   // Send a DELETE request to the API endpoint to delete the todo
        //   fetch(`https://dummyjson.com/todos/${todoId}`, {
        //     method: "DELETE",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   })
        //     .then((response) => {
        //       if (response.ok) {
        //        
        //         todoItemDiv.remove();
        //       } else {
        //        
        //         console.error("Failed to delete todo:", response.statusText);
        //       }
        //     })
        //     .catch((error) => {
        //      
        //       console.error("Error deleting todo:", error);
        //     });
        // });

        // Append the text box and buttons to the todo item div
        todoItemDiv.appendChild(todoTextBox);
        // todoItemDiv.appendChild(updateButton);
        // todoItemDiv.appendChild(deleteButton);

        
        return todoItemDiv;
      });
      todoItems.forEach((todoItem) => {
        todoContainer.appendChild(todoItem);
      });
    })
    .catch((error) => {
     
      console.error("Error fetching todos:", error);
    });
} else {
  console.log("User ID not found in localStorage");
}
