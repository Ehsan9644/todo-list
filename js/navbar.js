// Get references to navigation links
const homeLink = document.getElementById("home-link");
const addTodoLink = document.getElementById("add-todo-link");
const allTodosLink = document.getElementById("all-todos-link");

// Add event listeners to navigation links
homeLink.addEventListener("click", navigateToHome);
addTodoLink.addEventListener("click", navigateToAddTodo);
allTodosLink.addEventListener("click", navigateToAllTodos);

// Functions to navigate to different pages
function navigateToHome(event) {
  event.preventDefault();
  // home page
  window.location.href = "../components/home.html";
}

function navigateToAddTodo(event) {
  event.preventDefault();
  //  add todo page
  window.location.href = "../components/addTodo.html";
}

function navigateToAllTodos(event) {
  event.preventDefault();
  // to all todos page
  window.location.href = "../components/allTodos.html";
}


//logout function
document.getElementById("logout").addEventListener("click", function () {
  // Clear any authentication tokens or session data
  // For example, if using localStorage for storing tokens:
  localStorage.removeItem("token");

  // Redirect the user to the login page
  window.location.href = "../components/sign-in.html";
});