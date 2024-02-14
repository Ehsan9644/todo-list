
const todoInput = document.getElementById("todoInput");
const listContainer = document.getElementById("list-container");
const userId = localStorage.getItem("userId");

// Load todos from local storage or initialize an empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {

fetch("https://dummyjson.com/todos/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    todo: "Use DummyJSON in the project",
    completed: false,
    userId: 5,
  }),
})
  .then((response) => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to add todo.");
    }
    // Return the response to the next then block
    return response;
  })
  .then((data) => {
    // Log the data received from the server
    console.log(data);
    // Access the status of the response
    const status = data.status;
    console.log("Status:" + status);

    if (status == 200) {
      const todoText = todoInput.value.trim();
      if (todoText === "") {
        alert("You must write something");
        return;
      }

      // Create a todo object
      const todo = {
        todo: todoText,
        completed: false,
        userId: userId,
      };

      // Add todo to the array
      todos.push(todo);

      saveData();

      todoInput.value = "";
    } 
    else {
       alert("Bad Request");
    }
    function saveData() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
 
  })
  
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
   
  });












  
  
}

